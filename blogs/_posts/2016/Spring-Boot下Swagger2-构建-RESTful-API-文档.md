---
title: Spring-Boot下Swagger2 构建 RESTful API 文档
comments: true
top: false
date: 2016-10-08 10:12:30
updated: 2017-01-16 11:36:42
categories:
    - Java
    - Spring
    - 微服务
tags:
    - Java
    - Spring
    - Spring Boot
    - Swagger2
    - 微服务
keywords:
    - Java
    - Spring
    - Spring Boot
    - Swagger2
    - 微服务
description:
    使用 Swagger2 构建 Spring Boot 文档.
---
基于`Spring Boot`的 __快速__ 构建特性, 我们可以使用`Spring Boot` 构建`Restful api`, 相信这也是选择`Spring Boot`的主要原因.
提供完接口, 我们还需要将接口提供给他人使用, 这个时候文档显得格外重要. 那么我们如何 __快速__ 应对这中快速构建`API` 的文档需求?
另外, 如此众多的接口, 复杂的细节 (不同的`HTTP`请求类型、`HTTP`头部信息、`HTTP`请求内容等), 以至于快速提供文档非常的困难.
除此之外, 随着 __版本的迭代更新__ , 不断修改接口实现的时候都必须 _同步_ 修改接口文档，而文档与代码又处于两个不同的媒介, 这个时候 ___文档很容易与接口不匹配___。

如何解决上述问题? `RESTful API`的重磅好伙伴`Swagger2` 应运而生.
它可以轻松的整合到`Spring Boot`中，并与`Spring MVC`程序配合构建出强大`RESTful API`文档.
`Swagger2`不但可以减少文档的维护时间, 还可以将文档描述与代码相结合, 大大的节省了我们的开发时间.
当然, `Swagger2` 还有页面测试功能来调试每个 `API`。

效果如下图:

<img src="Swagger2-html.png" width="50%" height="50%" alt="Swagger2 UI">

## 如何构建Swagger2文档

### 添加依赖
在 `pom` 中添加 `Swagger2` 依赖

```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.2.2</version>
</dependency>
```

### 创建 `Swagger2` 配置类
这里我们使用`Spring Boot` 的`Java config`

```Java
@Configuration
@EnableSwagger2
public class Swagger2 {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("api")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.erasme.demo.api"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createWebApi() {
        return new Docket(DocumentationType.SPRING_WEB)
                .groupName("web") // < --
                .apiInfo(webInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.erasme.demo.web"))
                .paths(PathSelectors.any())
                .build()
                .useDefaultResponseMessages(false)
                .forCodeGeneration(true);
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Spring Boot中使用Swagger2构建 RESTful APIs")
                .description("api")
                .termsOfServiceUrl("api")
                .contact("api")
                .version("1.0")
                .build();
    }
    private ApiInfo webInfo() {
        return new ApiInfoBuilder()
                .title("Spring Boot中使用Swagger2构建 web APIs")
                .description("web 文档")
                .termsOfServiceUrl("web")
                .contact("web")
                .version("1.0")
                .build();
    }

}
```
如上所示, 通过`@Configuration`注解，让`Spring`来加载该类配置。再通过`@EnableSwagger2`注解来启用`Swagger2`.

再通过`createRestApi`函数创建Docket的Bean之后，`apiInfo()`用来创建该Api的基本信息（这些基本信息会展现在文档页面中.
`select()`函数返回一个`ApiSelectorBuilder`实例用来控制哪些接口暴露给Swagger来展现.
上述示例采用指定扫描的包路径来定义, `Swagger`会扫描该包下所有`Controller`定义的`API`, 并产生文档内容（除了被`@ApiIgnore`指定的请求.

这里 注意下, 我们配置了两个`Docket`, 分别指向不同包下, 指明了不同`GroupName`. 分别为 `Restful API` 与 `WEB api`

### 添加文档内容
配置完成后, 其实已经可以生产文档内容, 但是这样的文档主要针对请求本身, 而描述主要来源于函数等命名产生, 对用户并不友好, 我们通常需要自己增加一些说明来丰富文档内容.
如下所示，我们通过`@ApiOperation`注解来给API增加说明、通过`@ApiImplicitParams`、`@ApiImplicitParam`注解来给参数增加说明.

```Java
@RestController
@RequestMapping(value="/users")     // 通过这里配置使下面的映射都在/users下，可去除
public class UserApi {

    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>());

    @ApiOperation(value="获取用户列表", notes="")
    @RequestMapping(value={""}, method=RequestMethod.GET)
    public List<User> getUserList() {
        List<User> r = new ArrayList<User>(users.values());
        return r;
    }

    @ApiOperation(value="创建用户", notes="根据User对象创建用户")
    @ApiImplicitParam(name = "user", value = "用户详细实体user", required = true, dataType = "User")
    @RequestMapping(value="", method= RequestMethod.POST)
    public String postUser(@RequestBody User user) {
        users.put(user.getId(), user);
        return "success";
    }

    @ApiOperation(value="获取用户详细信息", notes="根据url的id来获取用户详细信息")
    @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long")
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        return users.get(id);
    }

    @ApiOperation(value="更新用户详细信息", notes="根据url的id来指定更新对象，并根据传过来的user信息来更新用户详细信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long"),
            @ApiImplicitParam(name = "user", value = "用户详细实体user", required = true, dataType = "User")
    })
    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public String putUser(@PathVariable Long id, @RequestBody User user) {
        User u = users.get(id);
        u.setName(user.getName());
        u.setAge(user.getAge());
        users.put(id, u);
        return "success";
    }

    @ApiOperation(value="删除用户", notes="根据url的id来指定删除对象")
    @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long")
    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public String deleteUser(@PathVariable Long id) {
        users.remove(id);
        return "success";
    }

}
```

下面为 `web api`
```Java
@RestController
public class HelloController {
    @RequestMapping(value = "/hello", method = RequestMethod.POST)
    public String index() {
        return "Hello World";
    }
}
```
其中指明`method`, 用于指定特定方法, 否则会产生 ___所有___ `Http` 请求类型的接口.

完成上述代码添加接口描述后,
启动`Spring Boot`程序，访问：[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html "swagger-ui"), 就能看到前文所展示的`RESTful API`的页面。

如下图所示:

__Restful api__

<img src=" restful api.png" width="50%" height="50%" alt="Swagger2 rest api">

__web api__

<img src="web api.png" width="50%" height="50%" alt="Swagger2 web api">


我们可以再点开具体的`API`请求，以`PUT`类型的`/users`请求为例，可找到上述代码中我们配置的`Notes`信息以及参数`user`的描述信息，如下图所示.

<img src="api put.png" width="50%" height="50%" alt="Swagger2 PUT">

### `API`文档访问与`调试`

在上图请求的页面中，我们看到`user`的`Value`是个输入框？是的，`Swagger`除了查看接口功能外，还提供了调试测试功能，我们可以点击上图中右侧的`Model Schema`（黄色区域：它指明了`User`的数据结构），此时`Value`中就有了`user`对象的模板，我们只需要稍适修改，点击下方`“Try it out！”`按钮，即可完成了一次请求调用！

此时，你也可以通过几个`GET`请求来验证之前的`POST`请求是否正确。

相比为这些接口编写文档的工作，我们增加的配置内容是非常少而且精简的，对于原有代码的侵入也在忍受范围之内。
因此，在构建`RESTful API`的同时，加入`swagger`来对`API`文档进行管理，是个不错的选择。
