---
title: Spring-Boot的web开发
comments: true
top: false
date: 2016-10-09 20:10:12
updated: 2017-01-15 14:16:41
categories:
    - Java
    - Spring
    - 微服务
tags:
    - Java
    - Spring
    - Spring Boot
    - 微服务
keywords:
    - Java
    - Spring
    - Spring Boot
    - Spring MVC
    - 微服务
description:
    Spring Boot的web开发核心在于内嵌 servlet 容器 与 Spring MVC
---
## Spring Boot 的 web 开发支持
`Spring Boot` 提供了 `spring-boot-web-starter` 为`web`开发予以支持.
其提供了内嵌的`Tomcat` 以及`Spring MVC`依赖, _详细见[Spring Boot 配置](../../../1006/2016/Spring-Boot配置/)_

## 模板引擎的支持
`Spring Boot` 提供了大量的模板引擎. 包括 Freemarker, Groovy, Thymeleaf, Velocity 和 Mustache.
`Spring Boot` 推荐使用`Thymeleaf`. 因其提供了完整的`Spring MVC`支持, 可完全替代`JSP`.
`Thymeleaf`的主要目标在于提供一种可被浏览器正确显示的、格式良好的模板创建方式，因此也可以用作静态建模。
可以使用它创建经过验证的`XML`与`HTML`模板。相对于编写逻辑或代码，开发者只需将标签属性添加到模板中即可。接下来，这些标签属性就会在`DOM`（文档对象模型）上执行预先制定好的逻辑。

示例:
```
<table>
  <thead>
    <tr>
      <th th:text="#{product.name}">Name</td>
      <th th:text="#{product.price}">Price</td>
    </tr>
  </thead>
  <tbody>
    <tr th:each="prod : ${allProducts}">
      <td th:text="${prod.name}">Oranges</td>
      <td th:text="${#numbers.formatDecimal(prod.price,1,2)}">0.99</td>
    </tr>
  </tbody>
</table>
```
可以看到`Thymeleaf`主要以属性的方式加入到html标签中，浏览器在解析`html`时，当检查到没有的属性时候会忽略，
所以`Thymeleaf`的模板可以通过浏览器直接打开展现，这样非常有利于前后端的分离。

详细介绍 见 [Spring Boot 配置](../../../1106/2016/Thymeleaf-简明教程/)

### Spring Boot 整合 Thymeleaf
通常情况下, 在`Spring MVC` 里若要使用模板引擎,需要定义 `ViewResolver`, `ViewResolver`需要定义一个 `View`
例如:
```Java
@Configuration
public class ViewConfig {
    @Bean
    public TemplateResolver templateResolver(){
        TemplateResolver templateResolver = new ServletContextTemplateResolver();
        templateResolver.setPrefix("WEB-INF/templates");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML5");
        return templateResolver;
    }

    @Bean
    public SpringTemplateEngine templateEngine(){
        SpringTemplateEngine springTemplateEngine = new SpringTemplateEngine();
        springTemplateEngine.setTemplateResolver(templateResolver());

        return springTemplateEngine;
    }

    @Bean
    public ThymeleafViewResolver thymeleafViewResolver(){
        ThymeleafViewResolver thymeleafViewResolver = new ThymeleafViewResolver();
        thymeleafViewResolver.setTemplateEngine(templateEngine());
        return thymeleafViewResolver;
    }
}
```

但在 `Spring Boot` 下并不需要, `Spring Boot` 通过 `org.springframework.boot.autoconfigure.thymeleaf` 包对 `Thymeleaf`进行了自动配置.

通过 `ThymeleafAutoConfigoration` 类对集成所需的 `Bean` 进行自动配置. 包括 `TemplateResolver`, `TemplateEngine`, `ThymeleafViewResolver` 的配置
通过查看 `ThymeleafProperties` 我们可以查看如何设置属性及其默认值.

```Java
@ConfigurationProperties(prefix = "spring.thymeleaf")
public class ThymeleafProperties {

    private static final Charset DEFAULT_ENCODING = Charset.forName("UTF-8");

    private static final MimeType DEFAULT_CONTENT_TYPE = MimeType.valueOf("text/html");

    public static final String DEFAULT_PREFIX = "classpath:/templates/";

    public static final String DEFAULT_SUFFIX = ".html";

    /**
     * Check that the template exists before rendering it (Thymeleaf 3+).
     */
    private boolean checkTemplate = true;

    /**
     * Check that the templates location exists.
     */
    private boolean checkTemplateLocation = true;

    /**
     * Prefix that gets prepended to view names when building a URL.
     */
    private String prefix = DEFAULT_PREFIX;

    /**
     * Suffix that gets appended to view names when building a URL.
     */
    private String suffix = DEFAULT_SUFFIX;

    /**
     * Template mode to be applied to templates. See also StandardTemplateModeHandlers.
     */
    private String mode = "HTML5";

    /**
     * Template encoding.
     */
    private Charset encoding = DEFAULT_ENCODING;

    /**
     * Content-Type value.
     */
    private MimeType contentType = DEFAULT_CONTENT_TYPE;

    /**
     * Enable template caching.
     */
    private boolean cache = true;

    /**
     * Order of the template resolver in the chain. By default, the template resolver is
     * first in the chain. Order start at 1 and should only be set if you have defined
     * additional "TemplateResolver" beans.
     */
    private Integer templateResolverOrder;

    /**
     * Comma-separated list of view names that can be resolved.
     */
    private String[] viewNames;

    /**
     * Comma-separated list of view names that should be excluded from resolution.
     */
    private String[] excludedViewNames;

    /**
     * Enable MVC Thymeleaf view resolution.
     */
    private boolean enabled = true;

```

```Java
spring:
    thymeleaf:
        # Enable template caching.
        cache: true
        # Check that the templates location exists.
        check-template-location: true
        # Content-Type value.
        content-type: text/html
        # Enable MVC Thymeleaf view resolution.
        enabled: true
        # Template encoding.
        encoding: UTF-8
        # Comma-separated list of view names that should be excluded from resolution.
        excluded-view-names=
        # Template mode to be applied to templates. See also StandardTemplateModeHandlers.
        mode: HTML5
        # Prefix that gets prepended to view names when building a URL.
        prefix: classpath:/templates/
        # Suffix that gets appended to view names when building a URL.
        suffix: .html  
        # Order of the template resolver in the chain.
        template-resolver-order:
        # View Name
        view-names:
```

## `Web` 相关配置

### `Spring Boot` 的自动配置
`Spring Boot` 的web配置在 `WebMvcAutoConfiguration` 以及 `WebMvcProperties` 下面
`WebMvcAutoConfiguration` 中配置如下

<img src="WebMvcAutoConfiguration-1.png" width="50%" height="50%" alt="WebMvcAutoConfiguration-1">

`WebMvcProperties` 如下

<img src="WebMvcProperties-1.png" width="50%" height="50%" alt="WebMvcProperties-1">

可以看出他们提供了如下的自动配置.

#### 自动配置 `ViewResolver`
1. `ContentNegotiatingViewResolver`
这个是 `Spring MVC` 最高优先级的 `ViewResolver`, 他自己不处理View, 而是代理给不同的ViewResolver来处理View.

2. `BeanNameViewResolver`
这个是通过在 `@Controller` 控制器方法返回字符串(视图名)会根据 `BeanNameViewResolver` 去查找Bean的名称为返回字符串的`View` 来渲染视图.

以示例演示:
```Java
@Configuration
public class WebConfig {

    // 定义 BeanNameViewResolver
    @Bean
    public BeanNameViewResolver beanNameViewResolver(){
        BeanNameViewResolver viewResolver = new BeanNameViewResolver();
        return viewResolver;
    }

    // 定义一个jsonView 的View
    @Bean
    public MappingJackson2JsonView jsonView() {
        MappingJackson2JsonView jsonView = new MappingJackson2JsonView();
        return jsonView;
    }
}
```

```Java
@Controller
public class HelloController {
    // 返回jsonView字符串， 会查找Bean 名称为jsonView的视图在渲染
    @RequestMapping(value = "/jsonView", produces = MediaType.APPLICATION_JSON_VALUE)
    public String jsonView(Model model) {
        User user = new User();
        user.setName("T");
        user.setAge(1);
        model.addAttribute("user", user);
        return "jsonView";
    }
}
```
效果如下:

<img src="result-1.png" width="50%" height="50%" alt="result-1">

3. `InternalResourceViewResolver`
这是个常见的 `ViewResolver` , 是通过前缀 后缀 以及 控制器 返回的视图名字符串以得到实际页面

`Spring Boot` 配置 如下
```Java
@Bean
@ConditionalOnMissingBean
public InternalResourceViewResolver defaultViewResolver() {
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
    resolver.setPrefix(this.mvcProperties.getView().getPrefix());
    resolver.setSuffix(this.mvcProperties.getView().getSuffix());
    return resolver;
}
```

#### 自动配置静态资源
静态资源的自动化配置是在上述提到的`WebMvcAutoConfiguration` 的 `addResourceHandlers` 方法中定义的
如下
```Java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
        return;
    }
    Integer cachePeriod = this.resourceProperties.getCachePeriod();
    if (!registry.hasMappingForPattern("/webjars/**")) {
        customizeResourceHandlerRegistration(
                registry.addResourceHandler("/webjars/**")
                        .addResourceLocations(
                                "classpath:/META-INF/resources/webjars/")
                .setCachePeriod(cachePeriod));
    }
    String staticPathPattern = this.mvcProperties.getStaticPathPattern();
    if (!registry.hasMappingForPattern(staticPathPattern)) {
        customizeResourceHandlerRegistration(
                registry.addResourceHandler(staticPathPattern)
                        .addResourceLocations(
                                this.resourceProperties.getStaticLocations())
                .setCachePeriod(cachePeriod));
    }
}
```
他配置了
1. 类路径文件
类路径下的 `/static` , `/public`, `/resources`, 与 `/META-INF/resoures` 文件夹下的静态文件直接映射为`/**`, 可以直接通过 [http://localhost:8080/**](http://localhost:8080/** "localhost") 访问.

2. `webjar`
`webjar` 是 将常用脚本框架封装在`jar`包中的`jar`, _详情可见 [webjars](http://www.webjars.org "webjars")_

`Spring Boot` 把  `/META-INF/resoures/webjars` 下的静态文件映射为`/webjar/**`, 可以直接使用[http://localhost:8080/webjar/**](http://localhost:8080/webjar/** "localhost webjar") 访问

#### 自动配置 `Formatter` 和 `Converter`

先看源码

```java
@Override
public void addFormatters(FormatterRegistry registry) {
    for (Converter<?, ?> converter : getBeansOfType(Converter.class)) {
        registry.addConverter(converter);
    }
    for (GenericConverter converter : getBeansOfType(GenericConverter.class)) {
        registry.addConverter(converter);
    }
    for (Formatter<?> formatter : getBeansOfType(Formatter.class)) {
        registry.addFormatter(formatter);
    }
}

private <T> Collection<T> getBeansOfType(Class<T> type) {
    return this.beanFactory.getBeansOfType(type).values();
}

```

可以看出, 只要我们定义了`Converter` `GenericConverter` `Formatter` 这些接口的实现类的`Bean`, `Spring Boot` 便会自动注册到 `Spring MVC`中

#### 自动配置 `HttpMessageConverters`

在`WebMvcAutoConfiguration`中, `Spring  Boot` 帮我们注册了 `messageConverters`

```Java
private final HttpMessageConverters messageConverters;

@Override
public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    converters.addAll(this.messageConverters.getConverters());
}
```
其中, `Spring Boot` 直接注入了`HttpMessageConverters`, 他是在`HttpMessageConvertersAutoConfiguration`定义的. 如下
```java
@Configuration
@ConditionalOnClass(HttpMessageConverter.class)
@AutoConfigureAfter({ GsonAutoConfiguration.class, JacksonAutoConfiguration.class })
@Import({ JacksonHttpMessageConvertersConfiguration.class, GsonHttpMessageConvertersConfiguration.class })
public class HttpMessageConvertersAutoConfiguration{

}
```

他除了注册`Spring MVC`常见的`Converter` (如: `ByteArrayHttpMessageConverter`,`StringHttpMessageConverter`,`ResourceHttpMessageConverter`,`SourceHttpMessageConverter`, `AllEncompassingFormMessageConverter`)外, 还自动引入 `JacksonHttpMessageConverters`, `GsonHttpMessageConverters`.

当然是通过条件引入.

- 如果`jackson`的`jar`包在类路径上, 则`Spring Boot` 通过`JacksonHttpMessageConvertersConfiguration `增加`MappingJackson2XmlHttpMessageConverter` 与 `MappingJackson2HttpMessageConverter`
如下
```java
@Configuration
class JacksonHttpMessageConvertersConfiguration {

    @Configuration
    @ConditionalOnClass(ObjectMapper.class)
    @ConditionalOnBean(ObjectMapper.class)
    @ConditionalOnProperty(name = HttpMessageConvertersAutoConfiguration.PREFERRED_MAPPER_PROPERTY, havingValue = "jackson", matchIfMissing = true)
    protected static class MappingJackson2HttpMessageConverterConfiguration {

        @Bean
        @ConditionalOnMissingBean(value = MappingJackson2HttpMessageConverter.class, ignoredType = {
                "org.springframework.hateoas.mvc.TypeConstrainedMappingJackson2HttpMessageConverter",
                "org.springframework.data.rest.webmvc.alps.AlpsJsonHttpMessageConverter" })
        public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter(
                ObjectMapper objectMapper) {
            return new MappingJackson2HttpMessageConverter(objectMapper);
        }

    }

    @Configuration
    @ConditionalOnClass(XmlMapper.class)
    @ConditionalOnBean(Jackson2ObjectMapperBuilder.class)
    protected static class MappingJackson2XmlHttpMessageConverterConfiguration {

        @Bean
        @ConditionalOnMissingBean
        public MappingJackson2XmlHttpMessageConverter mappingJackson2XmlHttpMessageConverter(
                Jackson2ObjectMapperBuilder builder) {
            return new MappingJackson2XmlHttpMessageConverter(
                    builder.createXmlMapper(true).build());
        }
    }
}
```

- 若`gson`在包路径上,则通过`GsonHttpMessageConvertersConfiguration`来配置增加`GsonHttpMessageConverter`
如下
```Java
@Configuration
@ConditionalOnClass(Gson.class)
class GsonHttpMessageConvertersConfiguration {
    @Configuration
    @ConditionalOnBean(Gson.class)
    @Conditional(PreferGsonOrMissingJacksonCondition.class)
    protected static class GsonHttpMessageConverterConfiguration {
        @Bean
        @ConditionalOnMissingBean
        public GsonHttpMessageConverter gsonHttpMessageConverter(Gson gson) {
            GsonHttpMessageConverter converter = new GsonHttpMessageConverter();
            converter.setGson(gson);
            return converter;
        }
    }
    private static class PreferGsonOrMissingJacksonCondition extends AnyNestedCondition {
        PreferGsonOrMissingJacksonCondition() {
            super(ConfigurationPhase.REGISTER_BEAN);
        }
        @ConditionalOnProperty(name = HttpMessageConvertersAutoConfiguration.PREFERRED_MAPPER_PROPERTY, havingValue = "gson", matchIfMissing = false)
        static class GsonPreferred {
        }
        @ConditionalOnMissingBean(MappingJackson2HttpMessageConverter.class)
        static class JacksonMissing {}
    }
}
```
当然, 我们也可以自定义`HttpMessageConverter`, 只需要自定义一个`HttpMessageConverter` 的`Bean`, 然后在其中注册其就可以了
如下

```java
@Bean
public HttpMessageConverters customConverter (){
    HttpMessageConverter<?> cu1 = new CustomConverter1;
    HttpMessageConverter<?> cu2 = new CustomConverter2;
    return new HttpMessageConverters(cu1,cu2);
}
```

#### 静态首页
Spring Boot 会自动映射 如下目录的网页
- classpath:/public/index.html
- classpath:/static/index.html
- classpath:/resources/index.html
- classpath:/META-INF/resources/index.html

只需要将静态首页放在上面的文件夹下, 即可使用 [http://localhost:8080](http://localhost:8080/ "localhost") 直接访问

### 接管Spring Boot WEB 配置

有的时候`Spring Boot`的默认配置不符合自己的需求, 则可以自定义个类, 加上`@EnableWebMvc`来实现自己控制`MVC`配置.
如果这个类继承自`WebMvcConfigurerAdapter`, 则既可以保留`Spring Boot`配置的便利, 又能增加自己额外的配置.

```java
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/xx").setViewName("/xx");
    }
}
```
这样, 我们重写了`addViewController`s, 但却不会影响`Spring Boot`中`WebMvcConfiguration`的`addViewControllers`方法, 因此在增加自定义的同时保留了原有默认`MVC`配置.

### 注册 Servlet Filter Listener
因为`Spring Boot`具有内嵌的`Servlet`容器, 我们就可以将`Servlet` `Filter` `Listener`注册为`Bean` 从而达到注册.

```java
@Bean
public XXServlet xxServlet(){
    return new XXServlet();
}

@Bean
public XXFilter xxServlet(){
    return new XXFilter();
}
@Bean
public XXListener xxServlet(){
    return new XXListener();
}
```
当然, 也可以使用`ServletRegistrationBean`, `FilterRegistrationBean`, `ServletListenerRegistrationBean` 来注册

```Java
@Bean
public ServletRegistrationBean servletRegistrationBean(){
    return new ServletRegistrationBean(new XXServlet(), "/XXX/*");
}
@Bean
public FilterRegistrationBean servletRegistrationBean(){
    FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
    filterRegistrationBean.setFilter(new XXFilter());
    filterRegistrationBean.setOrder(2);
    return FilterRegistrationBean;
}
@Bean
public ServletListenerRegistrationBean<XXListener> servletRegistrationBean(){
    return new ServletListenerRegistrationBean<XXListener>(new XXListener);
}
```

## 其他
当然, 我们还可以对内嵌的`Servlet`容器 进行配置,页面的`favicon`配置等等. 感兴趣可以查看 `org.springframework.boot.autoconfigure.web.ServerProperties`
