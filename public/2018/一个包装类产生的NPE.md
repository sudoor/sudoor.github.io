---
title: 一个包装类产生的NEP
comments: true
date: 2018-01-31 18:07:07
updated: 2018-01-31 18:07:07
categories:
    - Java
tags:
    - Java
keywords:
    - NEP
    - Java
    - 包装类
description:
    包装类产生的一个NEP
---

## 原起

昨天遇到一个空指针的问题，代码大致如下：

```java
public class Test {
    public long test1(long value) {
        return value;
    }

    public Long test2() {
        return null;
    }

    public void test3() {
        Long value = test2();
        // ...
        test1(value);
    }
}
```
这个当时出现的时候是查询总值返回的是包装 `Long`， 但是赋值给了一个`long` 类型的变量。

## 问题引出
运行时提示 `test(value);` 这一行抛出 `NullPointerException`
但是看着以上代码有些疑问：以上代码里一个对象方法都没有调用，`NullPointerException` 哪里来的？

## 原因分析
仔细看，会发现 test1 方法接受的是一个long 类型的值， 而我给了Long（实际值为null），然后想是不是这个地方出错了。也就是拆箱的时候出现了异常。
使用 `javap -c Test` 编译出class 文件 如下。

```java
Compiled from "Test.java"
public class Test {
  public Test();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public long test1(long);
    Code:
       0: lload_1
       1: lreturn

  public java.lang.Long test2();
    Code:
       0: aconst_null
       1: areturn

  public void test3();
    Code:
       0: aload_0
       1: invokevirtual #2                  // Method test2:()Ljava/lang/Long;
       4: astore_1
       5: aload_0
       6: aload_1
       7: invokevirtual #3                  // Method java/lang/Long.longValue:()J
      10: invokevirtual #4                  // Method test1:(J)J
      13: pop2
      14: return
}
```

从上面的字节码注释看得出， test1(value); 这个方法被转化为

```java
long primitive = value.longValue();
test1(promitive);
```

这样看起来这个就是自动拆箱的过程了。
而我传入的 value 为 null，value.longValue() 会抛出 NullPointerException。
这似乎就对了。

## 证实

自动拆箱机制是不是就是想上面的那样？
选择一种其它基本数据类型，比如 int，来验证：

```java
public class Test {
    public static void main(String[] args) {
        Integer value = 10;
        int primitive = value;
    }
}
```

对应的字节码：
```java
Compiled from "Test.java"
public class Test {
  public Test();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: bipush        10
       2: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
       5: astore_1
       6: aload_1
       7: invokevirtual #3                  // Method java/lang/Integer.intValue:()I
      10: istore_2
      11: return
}
```

继续分析字节码可以得出似乎才想是正确的。

## 自动拆箱与装箱
自动装箱与拆箱是 `Java 1.5` 引入的新特性，是一种`语法糖`。
以前使用Integer，我们需要
```java
Integer value = new Integer(10);
```
现在可以这样
```java
Integer value = 10;
```

### 定义与实现机制
自动装箱，是指从基本数据类型值到其对应的包装类对象的自动转换。
比如 `Integer value = 10;`，是通过调用 `Integer.valueOf()` 方法实现转换的。

自动拆箱，是指从包装类对象到其对应的基本数据类型值的自动转换。
比如 `int primitive = value;`，是通过调用 `Integer.intValue() `方法实现转换的。

|基本数据类型|	包装类型|	装箱方法|	拆箱方法|
|:--:|:--:|:--:|:--:|
|boolean|	Boolean|	Boolean.valueOf(boolean)|	Boolean.booleanValue()|
|byte|	Byte|	Byte.valueOf(byte)|	Byte.byteValue()|
|char|	Character|	Character.valueOf(char)|	Character.charValue()|
|short|	Short|	Short.valueOf(short)|	Short.shortValue()|
|int|	Integer|	Integer.valueOf(int)|	Integer.intValue()|
|long|	Long|	Long.valueOf(long)|	Long.longValue()|
|float|	Float|	Float.valueOf(float)|	Float.floatValue()|
|double|	Double|	Double.valueOf(double)|	Double.doubleValue()|

### 何时发生拆装箱
`自动装箱`与`拆箱`主要发生在以下四种时机：
- 赋值时
- 比较时
- 算术运算时
- 方法调用时

#### 常见场景
1. Case 1
```java
Integer value = 10; // 自动装箱（赋值时）
int primitive = value; // 自动拆箱（方法调用时）
```

2. Case 2
```java
Integer value = 1000;
// ...
if (value <= 1000) { // 自动拆箱（比较时）
    // ...
}
```

3. Case 3
```java
List<Integer> list = new ArrayList<>();
list.add(10); // 自动装箱（方法调用时）
int i = list.get(0); // 自动拆箱（赋值时）
```
_注：集合`Collections`里不能直接放入`原始类型`，集合只接收对象。_

4. Case 4
```java
ThreadLocal<Integer> local = new ThreadLocal<Integer>();
local.set(10); // 自动装箱（方法调用时）

int i = local.get(); // 自动拆箱（赋值时）
```
_注：`ThreadLocal` 不能存储`基本数据类型`，只接收引用类型。_

5. Case 5
```java
public void fun1(Integer value) {
    //
}

public void fun2(int value) {
    //
}

public void test() {
    fun1(10); // 自动装箱（方法调用时）

    Integer value = 10;
    fun2(value); // 自动拆箱（方法调用时）
}
```

6. Case 6
```java
Integer v1 = new Integer(10);
Integer v2 = new Integer(20);
int v3 = 30;

int sum = v1 + v2; // 自动拆箱（算术运算时）
sum = v1 + 30; // 自动拆箱（算术运算时）
```

## 拓展

### 比较
除 `==` 以外，
`包装类对象`与`基本数据类型值`的比较，
`包装类对象`与`包装类对象`之间的比较，
都是`自动拆箱` __后__ 与基本数据类型值进行比较，
所以，这些类型间进行比较时自动拆箱可能引发 `NullPointerException`。

`==` 比较特殊，
因为可以用于判断左右是否为`同一对象`，
所以两个`包装类对象`之间 `==`，会用于判断是否为`同一对象`，而`不会`进行`自动拆箱`操作；
`包装类对象`与`基本数据类型`值之间 `==`，`会` `自动拆箱`。

### 示例代码
```java
Integer v1 = new Integer(10);
Integer v2 = new Integer(20);

if (v1 < v2) { // 自动拆箱
    // ...
}

if (v1 == v2) { // 不拆箱
    // ...
}

if (v1 == 10) { // 自动拆箱
    // ...
}
```

### 缓存
`Java` 为整型值包装类 `Byte`、`Character`、`Short`、`Integer`、`Long` 设置了缓存，用于存储一定范围内的值，详细如下：

|类型|	缓存值范围|
|:--:|:--:|
|Byte|	-128 ~ 127|
|Character|	0 ~ 127|
|Short|	-128 ~ 127|
|Integer|	-128 ~ 127（可配置）|
|Long|	-128 ~ 127|

在一些情况下，比如自动装箱时，如果值在缓存值范围内，将不创建新对象，直接从缓存里取出对象返回，比如：

```java
Integer v1 = 10;
Integer v2 = 10;
Integer v3 = new Integer(10);
Integer v4 = 128;
Integer v5 = 128;
Integer v6 = Integer.valueOf(10);

System.out.println(v1 == v2); // true
System.out.println(v1 == v3); // false
System.out.println(v4 == v5); // false
System.out.println(v1 == v6); // true
```

### 缓存实现机制

这里使用了设计模式`享元模式`。

以 `Short` 类实现源码为例

```java
// ...
public final class Short extends Number implements Comparable<Short> {
    // ...
    private static class ShortCache {
        private ShortCache(){}

        static final Short cache[] = new Short[-(-128) + 127 + 1];

        static {
            for(int i = 0; i < cache.length; i++)
                cache[i] = new Short((short)(i - 128));
        }
    }

    // ...
    public static Short valueOf(short s) {
        final int offset = 128;
        int sAsInt = s;
        if (sAsInt >= -128 && sAsInt <= 127) { // must cache
            return ShortCache.cache[sAsInt + offset];
        }
        return new Short(s);
    }
    // ...
}
```

在第一次调用到 `Short.valueOf(short)`` 方法时，将创建 ``-128 ~ 127` 对应的 `256` 个对象缓存到堆内存里。

这种设计，在频繁用到这个范围内的值的时候效率较高，可以避免重复创建和回收对象，否则有可能闲置较多对象在内存中。

### 使用不当的情况
`自动装箱`和`拆箱`这种语法糖为我们写代码带来了简洁和便利，但如果使用不当，也有可能带来负面影响。

#### 性能的损耗
```java
Integer sum = 0;
for (int i = 1000; i < 5000; i++) {
    // 1. 先对 sum 进行自动拆箱
    // 2. 加法
    // 3. 自动装箱赋值给 sum，无法命中缓存，会 new Integer(int)
    sum = sum + i;
}
```
在循环过程中会分别调用 `4000` 次 `Integer.intValue()` 和 `Integer.valueOf(int)``，并 `new` `4000` 个 `Integer` 对象，
而这些操作将 `sum` 的类型改为 `int` 即可避免，节约运行时间和空间，提升性能。

#### java.lang.NullPointerException

尝试对一个值为 `null` 的包装类对象进行自动拆箱，就有可能造成 `NullPointerException`。

比如：
```java
Integer v1 = null;
int v2 = v1; // NullPointerException

if (v1 > 10) { // NullPointerException
    // ...
}
int v3 = v1 + 10; // NullPointerException
```

```java
public class Test {
    public static void main(String[] args) {
        long value = true ? null : 1; // NullPointerException
    }
}
```
这实际上还是对一个值为 `null` 的 `Long` 类型进行自动拆箱，反汇编代码：
```java
Compiled from "Test.java"
public class Test {
  public Test();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: aconst_null
       1: checkcast     #2                  // class java/lang/Long
       4: invokevirtual #3                  // Method java/lang/Long.longValue:()J
       7: lstore_1
       8: return
}
```