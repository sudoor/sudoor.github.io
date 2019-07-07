---
title: Spring-Boot缓存-Redis
comments: true
top: false
date: 2016-10-21 19:42:53
updated: 2017-01-24 19:31:51
categories:
    - Java
    - Spring
    - 微服务
tags:
    - Java
    - Spring
    - Spring Boot
    - Redis
    - 微服务
keywords:
    - Java
    - Spring
    - Spring Boot
    - Spring MVC
    - Redis
    - 微服务
description:
    有的时候我们为避免多次访问数据库，会对查询出的数据进行缓存处理。
    
---

## Spring 缓存支持
Spring 中有 CacheManager 与 Cache 两个接口来统一管理缓存。
CacheManager 用于各个缓存的抽象接口，Cache 用于缓存的操作接口。

### Spring 里的 CacheManager
Spring 里为不同的缓存实现了不同的 CacheManager，如下

|CacheManager|描述|
|--|:--:|
|SimpleCacheManager|使用 Collection 存储缓存|
|ConcurrentMapCacheManager|使用 ConcurrentMap 存储缓存|
|NoOpCacheManager|测试|
|EhCacheCacheManager|EhCache 缓存管理|
|GuavaCacheManager|Google Guava来管理|
|HazelcastCacheManager|Hazelcast 管理|
|JCacheCacheManager|JSR-107 标准实现的 JCache 缓存|
|RedisCacheManager|使用Redis|

任意一个实现的 CacheManager 都需要注册 实现了 CacheManager 的 Bean

```java
@Bean
public EhCacheCacheMananger cacheManager(CacheManager ehCacheCacheMananger){
    return new EhCacheCacheMananger(ehCacheCacheMananger);
}

```

### 声明式缓存
Spring 中4个注解声明缓存规则。 

|注解|说明|
|--|:--:|
|@Cacheable|执行方法前，先检查是否有缓存数据，有则取之，无则执行方法|
|@CachePut|始终将方法返回值放入缓存|
|@CacheEvit|将一条 或多条数据从缓存删除|
|@Caching|组合多个注解策略在同一个方法上|

其中前三个注解拥有 value 属性，指的是缓存名称。

### 开启声明式缓存
在配置类上 使用 @EnableCaching

```java
@Configuration
@EnableCaching
public class AppConfig{

}
```

## Spring Boot 中的缓存
在org.springframework.boot.autoconfigure.cache 包下 提供工了如下的 配置：

<img src="spring-boot-cache-1.png" width="50%" height="50%" alt="spring-boot-cache-1">

Spring 默认使用 SimpleCacheConfiguration , 也就是使用 ConcurrentMapCacheManager。
另外， 在 CacheProperties 里可以看到 Spring Boot的缓存配置是以 spring.cache 开头。
在 SpringBoot下 我们只需要使用注解@EnableCaching 就可以开启注解

### 切换缓存

想要切换到redis缓存 只需要

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

## Spring Redis 配置
使用 Redis 作为noSQL 数据库
### 配置
Spring Boot 对redis 的使用是 通过 Spring Data Redis 实现的。
Spring Boot 中通过 Spring Data JPA 为我们提供了相关的链接 ConnectionFactory 和 操作 RedisTemplate。

配置如下

```java
@Bean
public RedisConnectionFactory redisConnectionFactory(){
    return new JedisConnectionFactory;
}
``` 

说明：Spring Boot 为我们准备了四种常见的客户端。（JedisConnection，~~JredisConnection~~, LettuceConnection, ~~SrpConnection~~ ）

### 使用
Spring data Redis 提供的操作主要为

|方法|描述|
|--|:--:|
|opsForValue()|操作简单属性|
|opsForList()|操作含有List数据|
|opsForSet()|操作含有Set数据|
|opsForZSet()|操作含有 zSet的数组|
|opsForHash|操作含hash的数据|

### Spring Boot 支持
Spring Boot 对redis的自动配置如下
```java
@Configuration
@ConditionalOnClass({ JedisConnection.class, RedisOperations.class, Jedis.class })
@EnableConfigurationProperties(RedisProperties.class)
public class RedisAutoConfiguration {}
```

配置属性如下

```java
@ConfigurationProperties(prefix = "spring.redis")
public class RedisProperties {}
```

