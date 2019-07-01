---
title: 使用Maven archetype快速生成一个新项目
comments: true
top: false
date: 2015-03-30 13:44:04
updated: 2018-03-30 13:44:04
categories:
    - maven
tags:
    - maven
    - archetype
keywords:
    - maven
    - archetype
description:
    Archtype指项目的骨架
    Maven中的maven-archetype-plugin插件使用户可以方便的生成所需的项目骨架
---

## Archetype 介绍
`Archetype`是一个`Maven`项目的模板工具包，它定义了一类项目的基本架构。
`Archetype`为开发人员提供了创建`Maven`项目的模板，同时它也可以根据已有的`Maven`项目生成参数化的模板。
通过`archetype`，开发人员可以很方便地将一类项目的最佳实现应用到自己的项目中。在一个`Maven`项目中，可以通过`archetype`提供的范例快速入门并了解该项目的结构与特点。

`Maven Archetype`由下面几个模块组成：

1. `maven-archetype-plugin`：`Archetype`插件。通过该插件，开发者可以在`Maven`中使用`Archetype`。
1. `maven-archetype-plugin`：`Archetype`插件。通过该插件，开发者可以在`Maven`中使用`Archetype`。
1. `archetype-packaging`：用于描述`archetype`的生命周期与构建项目软件包
1. `archetype-models`：用于描述类与引用
1. `archetype-common`：核心类
1. `a`rchetype-testing`：用于测试`Maven Archetype`的内部组件

## Archetype 插件

`Maven`的`Archetype`插件让用户能够基于已有的项目骨架创建新的`Maven`项目，同时，该插件也可以从已有的项目中生成新的`archetype`。
`Maven`项目与`archetype`之间的关系如下图所示：

<img src="maven-archetype-2.png" width="50%" height="50%" alt="maven-archetype-2">

`Archetype`插件有四个目标可以直接使用：

`archetype:create`（不推荐）：从`archetype` 中创建一个`Maven`项目。
`archetype:generate`：从`archetype` 中创建一个`Maven`项目，需要开发人员在指定`archetype`，插件会从远程仓库中自动获取。
`archetype:create-from-project`：从已有的项目中生成`archetype`。
`archetype:crawl`：搜索并更新仓库中的`archetype`。

## Archetype 使用与设计
### 使用maven archetype来创建项目骨架

可以简单地运行：
```mvn archetype:generate```
紧接着会看到一段长长的输出，有很多可用的Archetype供选择。

```
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] >>> maven-archetype-plugin:3.0.1:generate (default-cli) > generate-sources @ standalone-pom >>>
[INFO]
[INFO] <<< maven-archetype-plugin:3.0.1:generate (default-cli) < generate-sources @ standalone-pom <<<
[INFO]
[INFO]
[INFO] --- maven-archetype-plugin:3.0.1:generate (default-cli) @ standalone-pom ---
[INFO] Generating project in Interactive mode

```
如上， `Interactive mode` 为交互模式， 
每一个`Archetype`前面都会对应有一个编号。同时，命令行会提示一个默认的编号，这个编号对应的`Archetype`为`maven archetype quickstart`。
我们可以直接回车以选择`maven archetype quickstart`，紧接着Maven会提示输入`maven archetype quickstart`的版本，以及要创建项目的`groupId`、`artifactId`、`version`和包名`package`。

```
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 1119: Choose org.apache.maven.archetypes:maven-archetype-quickstart version:
1: 1.0-alpha-1
2: 1.0-alpha-2
3: 1.0-alpha-3
4: 1.0-alpha-4
5: 1.0
6: 1.1
Choose a number: 6:
Define value for property 'groupId': io.github
Define value for property 'artifactId': demo
Define value for property 'version' 1.0-SNAPSHOT: :
Define value for property 'package' io.github: :
Confirm properties configuration:
groupId: io.github
artifactId: demo
version: 1.0-SNAPSHOT
package: io.github
 Y: : y

```


    
会得到下图所示的结果：

```
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Old (1.x) Archetype: maven-archetype-quickstart:1.1
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: basedir, Value: /Users/Erasme/docs/sourceTree/demo
[INFO] Parameter: package, Value: io.github
[INFO] Parameter: groupId, Value: io.github
[INFO] Parameter: artifactId, Value: demo
[INFO] Parameter: packageName, Value: io.github
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] project created from Old (1.x) Archetype in dir: /Users/Erasme/docs/sourceTree/demo/demo
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 02:18 min
[INFO] Finished at: 2018-01-30T14:12:42+08:00
[INFO] Final Memory: 15M/53M
[INFO] ------------------------------------------------------------------------

```

目录如下：

```
demo
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── io
    │           └── github
    │               └── App.java
    └── test
        └── java
            └── io
                └── github
                    └── AppTest.java

9 directories, 3 files

```


`Archetype`插件将根据我们提供的信息创建项目骨架。在上面的例子中，`Archetype`插件会创建一个名为`hello world`的子目录。从中可以看到项目的基本结构：

`pom.xml`：包含了必要的信息以及一个`junit`依赖
`src/main/java`：主代码目录, 包含了一个`Java`类`io.github.App`，该类也只有一个简单的输出`Hello World!`的`main`方法
`src/test/java`：测试代码目录, 包含了一个测试用例`io.github.AppTest`。

上面为交互模式，我们也可以直接使用完整命令创建

```
mvn archetype:generate \
-DgroupId=org.sonatype.mavenbook.ch05 \
-DartifactId=simple-webapp \
-DpackageName=org.sonatype.mavenbook.ch05 \
-DarchetypeArtifactId=maven-archetype-webapp
```

即在关键词`groupId`、`artifactId`、`archetypeArtifactId`和`packageName`之前加`-D`来定义对应的内容。

### Archetype 的设计与生成

`Archetype`的设计可以根据项目的需求有所变化，本文以一个简单`Spring Boot`应用为例，介绍`archetype`的生成过程。

1. 创建一个新的`maven`项目，把配置好的文件放到相应的目录下面

- 修改`Maven`配置文件`pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<groupId>io.github</groupId>
<artifactId>demo</artifactId>
<version>1.0-SNAPSHOT</version>

<properties>
    <spring.boot.version>1.1.4.RELEASE</spring.boot.version>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>${spring.boot.version}</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>${spring.boot.version}</version>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <plugin>  
            <groupId>org.apache.maven.plugins</groupId>  
            <artifactId>maven-archetype-plugin</artifactId>  
            <version>3.0.1</version>  
        </plugin>
    </plugins>
</build>
</project>

```
添加依赖`org.springframework.boot:spring-boot-starter-web`，它是`Spring Boot`所提供的推荐的基础 `POM` 文件之一，用来提供创建基于`Spring MVC`的`Web`应用所需的第三方库依赖。

在添加完与Spring Boot相关的依赖以后，还需要将maven的archetype plugin添加到pom.xml中。

```xml
<plugin>  
    <groupId>org.apache.maven.plugins</groupId>  
    <artifactId>maven-archetype-plugin</artifactId>  
    <version>2.0-alpha-4</version>  
</plugin>
```

- 在`src/main/java`新建一个`Application`类，并加入示例代码

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class Application {
    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}
```

代码中的`Java`类`Application`是一个简单的可以独立运行的` Web `应用。直接运行该`Java `类会启动一个内嵌的`Tomcat`服务器运行在`8080`端口。
访问`http://localhost:8080`可以看到页面上显示`Hello World!`。
至此，一个简单的`spring boot`应用已经制作完成。

2. 生成`archetype`
执行命令

```shell
mvn archetype:create-from-project
```

如下输出
```
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building demo 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] >>> maven-archetype-plugin:2.0-alpha-4:create-from-project (default-cli) > generate-sources @ demo >>>
[INFO]
[INFO] <<< maven-archetype-plugin:2.0-alpha-4:create-from-project (default-cli) < generate-sources @ demo <<<
[INFO]
[INFO]
[INFO] --- maven-archetype-plugin:2.0-alpha-4:create-from-project (default-cli) @ demo ---
Downloading from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-interactivity-api/1.0-alpha-5/plexus-interactivity-api-1.0-alpha-5.jar
Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-interactivity-api/1.0-alpha-5/plexus-interactivity-api-1.0-alpha-5.jar (13 kB at 5.1 kB/s)
[INFO] Setting property: classpath.resource.loader.class => 'org.codehaus.plexus.velocity.ContextClassLoaderResourceLoader'.
[INFO] Setting property: velocimacro.messages.on => 'false'.
[INFO] Setting property: resource.loader => 'classpath'.
[INFO] Setting property: resource.manager.logwhenfound => 'false'.
[INFO] Setting default groupId: io.github
[INFO] Setting default artifactId: demo
[INFO] Setting default version: 1.0-SNAPSHOT
[INFO] Setting default package: io.github
[INFO] Archetype created in target/generated-sources/archetype
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.877 s
[INFO] Finished at: 2018-01-30T14:33:06+08:00
[INFO] Final Memory: 15M/52M
[INFO] ------------------------------------------------------------------------

```

3. 发布`archetype`

上面的步骤运行成功后，在工程的`target/generated-sources/archetype`目录下，会生成一个`Archetype`，进入这个目录。
```
../demo
├── pom.xml
├── src
│   ├── main
│   │   └── java
│   │       └── io
│   │           └── github
│   │               └── App.java
│   └── test
│       └── java
│           └── io
│               └── github
│                   └── AppTest.java
└── target
    └── generated-sources
        └── archetype
            ├── pom.xml
            └── src
                └── main
                    └── resources
                        ├── META-INF
                        │   └── maven
                        │       ├── archetype-metadata.xml
                        │       └── archetype.xml
                        └── archetype-resources
                            ├── pom.xml
                            └── src
                                ├── main
                                │   └── java
                                │       └── App.java
                                └── test
                                    └── java
                                        └── AppTest.java

```

如果想要将新生成的`archetype`运行在本地仓库，就运行`maven`命令：`mvn install`；如果想要共享这个`archetype`，就使用`deploy`命令。


### Archetype 自定义使用
上面我们使用 `mvn archetype` 命令创建了基本骨架。下面我们使用生成的骨架创建我们的应用。

#### 命令行调用maven插件

```
mvn archetype:generate \
-DgroupId=io.github \
-DartifactId=demo \
-DpackageName=io.github.demo \
-DarchetypeArtifactId=maven-archetype-webapp
```

如果不加任何参数，命令窗口显示的会有上千中项目骨架可够选择
可以使用`-DarchetypeCatalog,-Dfilter`选择过滤项目骨架，参数赋值的格式跟JAVA设置系统属性一样`-D<name>=<value>`

#### -DarchetypeCatalog参数

`archetypeCatalog`参数指定使用的`catalog.xml`文件，默认值是`remote`,`local`,上述命令等同于`mvn archetype:generate -DarchetypeCatalog=remote,local`

`internal`:使用插件内部的文件.
`local` ：使用本地的文件,默认路径是.m2/archetype-catalog.xml.
`remote `:使用远程的文件，默认路径是http://repo1.maven.org/maven2/archetype-catalog.xml.
`file://path/to/archetype-catalog.xml `：使用本地指定路径的文件.
`http://url/to/archetype-catalog.xml `：使用远程路径的文件.

#### -Dfilter参数

`filter`过滤选择对应的骨架，格式：`[groupId:]artifactId`，其中`groupI`d是可选

`-Dfilter=mvc` 表示过滤artifactId包含mvc关键字的项目骨架
如果有`groupId，-Dfilter=org.apache:struts`
通过过滤选择，可以生成一个我们需要的项目骨架，这里可以直接从命令行过滤关键字或者直接打开上述`remote`的`url`中的`archetype-catalog.xml`文件中查找

#### 其他
`Maven`的`Archetype Plugin`除了提供上述使用`archetype-catalog.xml`文件生成项目外，还有其他方式生成项目骨架：

- Generate projects in batch mode
- Create an archetype from a multi-module project
- Create an archetype with a property file

## 附
_IDEA_ 中常见的 `archetype`

<img src="maven-archetype-1.png" width="50%" height="50%" alt="maven-archetype-1">
