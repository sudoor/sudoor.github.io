---
title: Spring-Boot数据访问-jpa
comments: true
top: false
date: 2016-10-11 21:23:12
updated: 2017-01-15 22:10:21
categories:
    - Java
    - Spring
    - 微服务
tags:
    - Java
    - Spring
    - Spring Boot
    - JPA
    - 微服务
keywords:
    - Java
    - Spring
    - Spring Boot
    - Spring MVC
    - JPA
    - 微服务
description:
    Spring Data JPA 是Spring Data 的一个子项目， 通过提供基于JPA 的 Repository 可以极尽的减少数据库访问的代码量。
---

## 什么是Spring Data JPA
首先了解`JPA`是什么？

`JPA(Java Persistence API)`是`Sun`官方提出的`Java`持久化规范。
它为`Java`开发人员提供了一种对象/关联映射工具来管理Java应用中的关系数据。
他的出现主要是为了简化现有的持久化开发工作和整合`ORM`技术，结束现在Hibernate，`TopLink`，`JDO`等ORM框架各自为营的局面。
值得注意的是，`JPA`是在充分吸收了现有`Hibernate`，`TopLink`，`JDO`等`ORM`框架的基础上发展而来的，具有易于使用，伸缩性强等优点。

`Spring Data JPA`是`Spring`基于`Hibernate`开发的一个`JPA`框架。
如果用过`Hibernate`或者`MyBatis`的话，就会知道对象关系映射`（ORM）`框架有多么方便。
但是`Spring Data JPA`框架功能更进一步，为我们做了 一个数据持久层框架几乎能做的任何事情。

学习并使用 `Spring Data JPA` 可以极大提高开发效率！

`Spring Data JPA`让我们解脱了`DAO`层的操作，基本上所有`CRUD`都可以依赖于它来实现

## 定义数据访问层
使用 `Spring Data JPA` 访问数据库， 只需要定义一个继承 `JpaRepository` 接口即可。

```java
public Interface UserRepository extends JpaRepository<User, Long> {
 // CRUD 方法
}

```

也可以使用默认方法

```java
@Test
public void testBaseQuery() throws Exception {
    User user=new User();
    userRepository.findAll();
    userRepository.findOne(1l);
    userRepository.save(user);
    userRepository.delete(user);
    userRepository.count();
    userRepository.exists(1l);
    // ...
}
```

如果是继承`JpaRepository`， 也就默认有以上的默认方法

<img src="spring-boot-jpa-1.png" width="50%" height="50%" alt="spring-boot-jpa-1">

## 配置使用JPA

在`Spring` 中使用`JPA` ， 如果使用 `JAVA config` 只需要使用 `@EnableJpaRepositories` 注解即可。

```java
@Configuration
@EnableJpaRepositories
public class DBConfig {
    @Bean
    public EntityManagerFactory entityManagerFactory(){

    }
    ...
    // DataSource TransactionManager 等配置
}

```

## 定义查询方法

### 基本查询

基本查询也分为两种，

- 预先生成方法

`Spring Data JPA` 默认预先生成了一些基本的CURD的方法，例如：增、删、改等等, 如上所说。

- 自定义简单查询
自定义的简单查询就是根据方法名来自动生成`SQL`，主要的语法是`findXXBy`,`readAXXBy`,`queryXXBy`,`countXXBy`, `getXXBy`后面跟属性名称：

```java
User findByUserName(String userName);
```

也使用一些加一些关键字`And`、 `Or`

```java
User findByUserNameOrEmail(String username, String email);
```

修改、删除、统计也是类似语法

```java
Long deleteById(Long id);

Long countByUserName(String userName)
```

基本上`SQL`体系中的关键词都可以使用，例如：`LIKE`、 `IgnoreCase`、 `OrderBy`。

```java
List<User> findByEmailLike(String email);

User findByUserNameIgnoreCase(String userName);
    
List<User> findByUserNameOrderByEmailDesc(String email);
```

具体的关键字，使用方法和生产成`SQL`如下表所示

|关键字|    示例|    JPQL|
|--|:--:|:--:|
|And|    findByLastnameAndFirstname|    … where x.lastname = ? and x.firstname = ?|
|Or|    findByLastnameOrFirstname|    … where x.lastname = ? or x.firstname = ?|
|Is,Equals|    findByFirstnameIs,findByFirstnameEquals|    … where x.firstname = ?|
|Between|    findByStartDateBetween|    … where x.startDate between ? and ?|
|LessThan|    findByAgeLessThan|    … where x.age < ?|
|LessThanEqual|    findByAgeLessThanEqual|    … where x.age ⇐ ?|
|GreaterThan|    findByAgeGreaterThan|    … where x.age > ?|
|GreaterThanEqual|    findByAgeGreaterThanEqual|    … where x.age >= ?|
|After|    findByStartDateAfter|    … where x.startDate > ?|
|Before|    findByStartDateBefore|    … where x.startDate < ?|
|IsNull|    findByAgeIsNull|    … where x.age is null|
|IsNotNull,NotNull|    findByAge(Is)NotNull|    … where x.age not null|
|Like|    findByFirstnameLike|    … where x.firstname like ?|
|NotLike|    findByFirstnameNotLike|    … where x.firstname not like ?|
|StartingWith|    findByFirstnameStartingWith|    … where x.firstname like ? (parameter bound with appended %)|
|EndingWith|    findByFirstnameEndingWith|    … where x.firstname like ? (parameter bound with prepended %)|
|Containing|    findByFirstnameContaining|    … where x.firstname like ? (parameter bound wrapped in %)|
|OrderBy|    findByAgeOrderByLastnameDesc|    … where x.age = ? order by x.lastname desc|
|Not|    findByLastnameNot|    … where x.lastname <> ?|
|In|    findByAgeIn(Collection ages)|    … where x.age in ?|
|NotIn|    findByAgeNotIn(Collection age)|    … where x.age not in ?|
|TRUE|    findByActiveTrue()|    … where x.active = true|
|FALSE|    findByActiveFalse()|    … where x.active = false|
|IgnoreCase|    findByFirstnameIgnoreCase|    … where UPPER(x.firstame) = UPPER(?)|


### 复杂查询
在实际的开发中我们需要用到`分页`、`筛选`、`连表`等查询的时候就需要特殊的方法或者自定义`SQL`

- 分页查询
`分页查询`在实际使用中非常普遍了，`spring data jpa`已经帮我们实现了分页的功能，在
查询的方法中，需要传入参数`Pageable` ,当查询中有多个参数的时候`Pageable`建议做为最后一个参数传入

```java
Page<User> findALL(Pageable pageable);
    
Page<User> findByUserName(String userName,Pageable pageable);
```

`Pageable` 是`spring`封装的分页实现类，使用的时候需要传入页数、每页条数和排序规则

```java
@Test
public void testPageQuery() throws Exception {
    int page=1,size=10;
    Sort sort = new Sort(Direction.DESC, "id");
    Pageable pageable = new PageRequest(page, size, sort);
    userRepository.findALL(pageable);
    userRepository.findByUserName("testName", pageable);
}

```

- 限制查询

有时候我们只需要`查询前N个元素`，或者只取`前一个实体`。
```java
User findFirstByOrderByLastnameAsc();

User findTopByOrderByAgeDesc();

Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);

List<User> findFirst10ByLastname(String lastname, Sort sort);

List<User> findTop10ByLastname(String lastname, Pageable pageable);
```

### 自定义SQL查询
其实`Spring data` 觉大部分的`SQL`都可以根据方法名定义的方式来实现，但是由于某些原因我们想使用自定义的`SQL`来查询，`spring data`也是完美支持的；
在`SQL`的查询方法上面使用`@Query`注解，如涉及到删除和修改在需要加上`@Modifying` 
也可以根据需要添加 `@Transactional` 对事物的支持，查询超时的设置等

```java
@Modifying
@Query("update User u set u.userName = ? where u.id = ?")
int modifyByIdAndUserId(String  userName, Long id);
    
@Transactional
@Modifying
@Query("delete from User where id = ?")
void deleteByUserId(Long id);
  
@Transactional(timeout = 10)
@Query("select u from User u where u.emailAddress = ?")
    User findByEmailAddress(String emailAddress);
```

### 多表查询
多表查询在`spring data jpa`中有两种实现方式，
第一种是利用`hibernate`的级联查询来实现，
第二种是创建一个结果集的接口来接收连表查询后的结果，这里主要第二种方式。

首先需要定义一个`结果集`的`接口类`。

```java
public interface HotelSummary {

    City getCity();

    String getName();

    Double getAverageRating();

    default Integer getAverageRatingRounded() {
        return getAverageRating() == null ? null : (int) Math.round(getAverageRating());
    }

}
```

查询的方法`返回类型`设置为新创建的`接口`
```java
@Query("select h.city as city, h.name as name, avg(r.rating) as averageRating "
 - "from Hotel h left outer join h.reviews r where h.city = ? group by h")
Page<HotelSummary> findByCity(City city, Pageable pageable);

@Query("select h.name as name, avg(r.rating) as averageRating "
 - "from Hotel h left outer join h.reviews r  group by h")
Page<HotelSummary> findByCity(Pageable pageable);
```

使用
```java
Page<HotelSummary> hotels = this.hotelRepository.findByCity(new PageRequest(0, 10, Direction.ASC, "name"));
for(HotelSummary summay:hotels){
        System.out.println("Name" +summay.getName());
    }
```

在运行中`Spring`会给接口`（HotelSummary）`自动生产一个代理类来接收返回的结果，代码汇总使用`getXX`的形式来获取。

## Spring Boot 下的JPA

### JDBC 配置

`Spring Boot` 也对 `JDBC`做了自动配置。如图

<img src="spring-boot-jpa-jdbc.png" width="50%" height="50%" alt="spring-boot-jpa-jdbc">

可以得出，`Spring Boot` 通过 `spring.datasource` 为前缀进行属性自动配置。并且开启注解事务管理。
同时配置了 一个`jdbcTemplate`。

`Spring Boot` 提供了 初始化数据的功能，
在类路径下的 `schema.sql` 会自动初始化表结构， `data.sql` 自动 填充数据。

### JPA 配置

`Spring Boot` 对 `JPA`的自动配置在 `org.springframework.boot.autoconfigure.orm.jpa` 下， 如图

<img src="spring-boot-orm-jpa.png" width="50%" height="50%" alt="spring-boot-orm-jpa">

从
```java
@ConfigurationProperties(prefix = "spring.jpa")
public class JpaProperties {}
```
看出，`JPA`的配置以`spring.jpa`开头

从

<img src="spring-boot-jpa-2.png" width="50%" height="50%" alt="spring-boot-jpa-2">

可以看出， 
`Spring Boot` 配置了`TransactionManager`， `JpaVendorAdapter`， `EntityManagerFactory` 等`Bean`。

从

```java
@Configuration
@ConditionalOnClass({ LocalContainerEntityManagerFactoryBean.class, EntityManager.class })
@Conditional(HibernateEntityManagerCondition.class)
@AutoConfigureAfter({ DataSourceAutoConfiguration.class })
public class HibernateJpaAutoConfiguration extends JpaBaseConfiguration {}
```
看出，`Spring Boot` 默认使用 `Hibernate` 实现。并且依赖于`DataSourceAutoConfiguration`。


### SPring Data JPA 配置
`Spring Boot` 对 `SPring Data JPA` 的自动配置在 `org.springframework.boot.autoconfigure.data.jpa` 下， 如图

<img src="spring-boot-jpa-3.png" width="50%" height="50%" alt="spring-boot-jpa-3">

`JpaRepositoriesAutoConfiguration` 源码配置如下
```java
@Configuration
@ConditionalOnBean(DataSource.class)
@ConditionalOnClass(JpaRepository.class)
@ConditionalOnMissingBean({ JpaRepositoryFactoryBean.class,
		JpaRepositoryConfigExtension.class })
@ConditionalOnProperty(prefix = "spring.data.jpa.repositories", name = "enabled", havingValue = "true", matchIfMissing = true)
@Import(JpaRepositoriesAutoConfigureRegistrar.class)
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
public class JpaRepositoriesAutoConfiguration {

}

```
他是依赖 `HibernateJpaAutoConfiguration` 的。


`JpaRepositoriesAutoConfigureRegistrar` 源码配置如下

```java

public class JpaRepositoriesAutoConfigureRegistrar
		extends AbstractRepositoryConfigurationSourceSupport {

	@EnableJpaRepositories
	private static class EnableJpaRepositoriesConfiguration {

	}

}
```
`JpaRepositoriesAutoConfigureRegistrar` 自动启用了 `EnableJpaRepositoriesConfiguration`

因此， 在`Spring Boot`下 使用 `JPA` ， 我们只需要 添加依赖， 定义 `datasource`， `实体类`， `数据访问层`， 
然后在使用数据访问的地方 注入 `数据访问层的Bean` 即可。