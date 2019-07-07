---
title: Spring-Boot使用RabbitMQ
comments: true
top: false
date: 2016-10-08 10:12:30
updated: 2017-01-16 11:36:42
categories:
    - Java
    - Spring
    - MQ
tags:
    - Java
    - Spring
    - Spring Boot
    - RabbitMQ
    - 微服务
keywords:
    - Java
    - Spring
    - Spring Boot
    - RabbitMQ
description:
    Spring Boot 使用 RabbitMQ
---
    
## Message Broker与AMQP简介

`Message Broker`是一种消息`验证、传输、路由`的架构模式，其设计目标主要应用于下面这些场景：

- 消息路由到一个或多个目的地
- 消息转化为其他的表现方式
- 执行消息的聚集、消息的分解，并将结果发送到他们的目的地，然后重新组合相应返回给消息用户
- 调用Web服务来检索数据
- 响应事件或错误
- 使用发布-订阅模式来提供内容或基于主题的消息路由

`AMQP`是`Advanced Message Queuing Protocol`的简称，它是一个面向消息中间件的开放式标准应用层协议。`AMQP`定义了这些特性：

1. 消息方向
1. 消息队列
1. 消息路由（包括：点到点和发布-订阅模式）
1. 可靠性
1. 安全性

## RabbitMQ
`RabbitMQ`是以`AMQP`协议实现的一种中间件产品，它可以支持多种操作系统，多种编程语言，几乎可以覆盖所有主流的企业级技术平台。

### 安装
在RabbitMQ官网的下载页面 (https://www.rabbitmq.com/download.html)[https://www.rabbitmq.com/download.html] 中，
我们可以获取到针对各种不同操作系统的安装包和说明文档。这里，我们将对几个常用的平台一一说明。

下面我们采用的`Erlang`和`RabbitMQ Server`版本说明：

```
Erlang/OTP 19.1
RabbitMQ Server 3.6.5
```

### Mac OS X安装
在`Mac OS X`中使用`brew`工具，可以很容易的安装`RabbitMQ`的服务端，只需要按如下命令操作即可：

`brew`更新到最新版本，执行：`brew update`
安装`Erlang`，执行：`brew install erlang`
安装`RabbitMQ Server`，执行：`brew install rabbitmq`
通过上面的命令，`RabbitMQ Server`的命令会被安装到`/usr/local/sbin`，并不会自动加到用户的环境变量中去，
所以我们需要在`.bash_profile`或`.profile`文件中增加下面内容：

```bash
PATH=$PATH:/usr/local/sbin
```

这样，我们就可以通过`rabbitmq-server`命令来启动`RabbitMQ`的服务端了。

## Rabbit管理
我们可以直接通过配置文件的访问进行管理，也可以通过Web的访问进行管理。下面我们将介绍如何通过Web进行管理。

执行命令，开启Web管理插件，这样我们就可以通过浏览器来进行管理了。

```
rabbitmq-plugins enable rabbitmq_management
The following plugins have been enabled:
  mochiweb
  webmachine
  rabbitmq_web_dispatch
  amqp_client
  rabbitmq_management_agent
  rabbitmq_management
Applying plugin configuration to rabbit@PC-201602152056... started 6 plugins.
```

打开浏览器并访问(http://localhost:15672/)[http://localhost:15672/]并使用默认用户`guest`登录，密码也为`guest`。我们可以看到如下图的管理页面：

<img src="rabbitMQ.png" width="50%" height="50%" alt="RabbitMQ">

从图中，我们可以看到 `Connections`、`Channels`、`Exchanges`、`Queue`等。

点击`Admin`标签，在这里可以进行用户的管理。

## Spring Boot整合

在`Spring Boot`中整合`RabbitMQ`是一件非常容易的事，因为之前我们已经介绍过`Starter POMs`，
其中的`AMQP`模块就可以很好的支持`RabbitMQ`，下面我们就来详细说说整合过程：

1. 新建一个Spring Boot工程，命名为：`rabbitmq-hello`。
在`pom.xml`中引入如下依赖内容，其中spring-boot-starter-amqp用于支持RabbitMQ。
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.3.7.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

在`application.properties`中配置关于`RabbitMQ`连接和用户信息，用户可以回到上面的安装内容，在管理页面中创建用户。
```yaml
spring:
    application:
        name: rabbitmq-hello
    rabbitmq:
        host: localhost
        port: 5672
        username: spring
        password: 123456
```

2. 创建消息生产者`Sender`。
通过注入`AmqpTemplate`接口的实例来实现消息的发送，`AmqpTemplate`接口定义了一套针对AMQP协议的基础操作。
在`Spring Boot`中会根据配置来注入其具体实现。在该生产者，我们会产生一个字符串，并发送到名为`hello`的队列中。
```java
@Component
public class Sender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send() {
        String context = "hello " + new Date();
        System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("hello", context);
    }

}
```
3. 创建消息消费者`Receiver`。
通过`@RabbitListener`注解定义该类对`hello`队列的监听，并用`@RabbitHandler`注解来指定对消息的处理方法。
所以，该消费者实现了对`hello`队列的消费，消费操作为输出消息的字符串内容。
```java
@Component
@RabbitListener(queues = "hello")
public class Receiver {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("Receiver : " + hello);
    }

}
```
4. 创建`RabbitMQ`的配置类`RabbitConfig`，用来配置队列、交换器、路由等高级信息。
这里我们以入门为主，先以最小化的配置来定义，以完成一个基本的生产和消费过程。

```java
@Configuration
public class RabbitConfig {

    @Bean
    public Queue helloQueue() {
        return new Queue("hello");
    }

}
```
5. 创建应用主类：
```java
@SpringBootApplication
public class HelloApplication {

    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class, args);
    }

}
```
6. 创建单元测试类，用来调用消息生产：
```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = HelloApplication.class)
public class HelloApplicationTests {

    @Autowired
    private Sender sender;

    @Test
    public void hello() throws Exception {
        sender.send();
    }

}
```
完成程序编写之后，下面开始尝试运行。首先确保`RabbitMQ Server`已经开始，然后进行下面的操作：

1. 启动应用主类，从控制台中，我们看到如下内容，程序创建了一个访问`127.0.0.1:5672`中`springcloud`的连接。
```
o.s.a.r.c.CachingConnectionFactory       : Created new connection: SimpleConnection@29836d32 [delegate=amqp://springcloud@127.0.0.1:5672/]
```
同时，我们通过`RabbitMQ`的控制面板，可以看到`Connection`和`Channels`中包含当前连接的条目。

运行单元测试类，我们可以看到控制台中输出下面的内容，消息被发送到了`RabbitMQ Server`的`hello`队列中。
```
Sender : hello Sun Oct 08 11:06:11 CST 2016
```
切换到应用主类的控制台，我们可以看到类似如下输出，消费者对hello队列的监听程序执行了，并输出了接受到的消息信息。
```
Receiver : hello Sun Oct 08 11:06:11 CST 2016
```
通过上面的示例，我们在`Spring Boot`应用中引入`spring-boot-starter-amqp`模块，进行简单配置就完成了对`RabbitMQ`的消息生产和消费的开发内容