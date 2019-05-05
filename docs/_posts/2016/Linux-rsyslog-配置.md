---
title: Linux rsyslog 配置
date: 2016-05-31 09:26:00
update: 2016-05-31 09:26:00
categories: Linux
tags: rsyslog
keywords:
    - Linux
    - rsyslog
description:
    Linux 系统中记录了多种日志，包括系统日志，服务，程序等等。
    在我们需要系统分析的时候，日志尤为重要。但如何查找日志或者归档日志？本文介绍一种集中化处理日志的方法--rsyslog
---

在 Cent OS 6中，日志是使用 __rsyslogd__ 守护进程进行管理的，该进程是之前版本的系统中 __syslogd__ 的升级版，
主要是对原有的日志系统进行了功能的扩展，提供过滤器，加密，配置，输入输出... 其中支持通过 TCP 或者 UDP 协议进行传输等功能

## WHERE ？Linux 日志在哪儿

在Linux下，大多数日志文件都位于 __/var/log/__ 目录中。其中这个目录下会有很多以数字结尾的文件，
这些是经过转储的文件，避免过大的日志导致读取失败或者占用过多内存的问题。
一般来说，在软件包 __logrotate__ 中包含了一个定时任务，根据 __/etc/logrotate.conf__ 里的配置和 __/etc/logrotate.d/__ 目录中的的配置定期的转储日志文件。

## HOW ？Rsyslog 如何配置

Rsyslog 的主要配置文件是 __/etc/rsyslog.conf__。
在配置文件中，我们通过配置 filter 以及 action 对日志进行管理。
在rsyslog配置文件中，使用如下格式定义规则

    filter  action


在 __rsyslog__ 发现符合 __filter__ 规则的日志后，便将将日志发送到 __action__ 指定的动作进行处理。

### Filter
在 __rsyslog__ 中有三种过滤器方法：

#### 基于设施/优先级的过滤器
基于设施/优先级的过滤器是最常用的方法，语法如下：

    FACILITY.PRIORITY

FACILITY 指定了产生日志消息的子系统
可选值为 auth , authpriv , cron , daemon , kern , lpr , mail , news , syslog , user , ftp , uucp , local0 ~ local7 。

PRIORITY 指定了日志消息的优先级
可用的优先级包含 debug (7) , info (6) , notice (5) , warning (4) , err (3) , crit (2) , alert (1) , emerg (0) 。

>前置符号=表明只有该优先级的消息会被捕获，!表明除了该优先级的消息之外的优先级会被捕获。除了前置符号外，可以使用符号*

>表示所有的设施或者优先级，对优先级部分使用none关键字会捕获所有没有指定优先级的消息。

>定义多个设施或者优先级使用,分隔，如果是多个 filter 的话，则使用;进行分隔。

示例
```
kern.*                    # 选择所有优先级的内核日志
mail.crit                 # 选择所有mail 的优先级高于crit的日志
cron.!info,!debug         # 选择除了 info 和 debug 优先级的 cron 日志
```

#### 基于属性的过滤器
基于属性的过滤器语法如下：

    :PROPERTY, [!]COMPARE_OPERATION, "STRING"

__:PROPERTY__ 是要比较日志属性，__COMPARE_OPERATION__ 为要执行的比较操作，这个的 *!* 表示取反的意思，"STRING"为比较的值。

可以使用的比较操作：

|比较操作 |描述|
|----|----|
|contains	|匹配提供的字符串值是否是属性的一部分，如果不区分大小写，使用contains_i|
|isequal	|比较属性和值是否相等|
|startswith	|属性是否以指定字符串开始(startswith_i)|
|regex	|正则表达式(POSIX BRE 基本正则)匹配|
|ereregex	|正则表达式(POSIX ERE 扩展正则)匹配|
|isempty	|判断属性是否为空，不需要 value|

使用范例：

```
:msg, contains, "error"
:hostname, isequal, "host1"
:msg, !regex, "fatal .* error"
```

#### 基于表达式的过滤器

基于表达式的过滤器是使用rsyslog自定义的脚本语言[RainerScript](http://www.rsyslog.com/doc/rainerscript.html?_blank)构建复杂的filter，不在此讨论。

### Action
Action定义了当匹配指定的 filter 的时候，执行什么操作。

如果要指定多个 ACTION， 使用 &连接多个 ACTION。
例如：
```
kern.=crit user1
& ^test-program;temp
& @192.168.0.1
```
这里的 __;temp__ 指定了传递日志给 __test-program__ 程序时 *（ ^ 开头表明日志发送给该可执行文件）*，使用它 __temp__ 模板格式化日志。

在 ACTION 后面追加;模板名称可以为指定的 action 使用该模板格式化日志。

#### 保存日志到日志文件
语法：

    FILTER PATH

这里的 PATH 指定了日志要保存到的文件。例如 __cron.* /var/log/cron.log__ 指定了所有的定时任务日志都写入到 __/var/log/cron.log__ 文件。

>默认情况下，每次生成 syslog 的时候，日志信息会同步到日志文件。可以在文件路径前使用 - 指定忽略同步（如果系统崩溃，会丢失日志，但是这样可以提高日志性能）。

除了上述方法记录日志（静态），也可以动态的生成日志文件。

    FILTER     ?DynamicFile
这里的 __DynamicFile__ 是预定义的输出路径模板。

#### 通过网络发送syslog
__rsyslog__ 可以使用网络将日志消息发送或者接受日志，使用这个特性，可以实现使用单一的日志服务器统一管理多台服务器日志。

    @[(zNUMBER)]HOST:[PORT]
这里的@告诉syslog使用 UDP 协议发送日志，要使用 TCP 的话，使用 @@。可选值zNUMBER设置了是否允许使用zlib对日志压缩（压缩级别1-9）。

示例
```
*.* @192.168.0.1        # 使用 UDP 发送，默认端口514
*.* @@example.com:18    # 使用 TCP 发送到端口18， 默认10514
*.* @(z9)[2001:db8::1]  # UDP, ipv6，使用zlib级别9压缩
```

#### 丢弃日志
使用 __~__ 丢弃日志消息。

    FILTER    ~

示例
```
cron.* ~
```

### 模板
任何 __rsyslog__ 生成的日志都可以根据需要使用模板进行格式化
要创建模板，使用如下指令

    $template TEMPLATE_NAME,"text %PROPERTY% more text", [OPTION]

这里的 __$template__ 指令表明了接下来的内容定义了一个模板，__TEMPLATE_NAME__ 是模板的名称，接下来双引号之间的内容为模板的内容。

这里还有一个 __OPTION__ ， 它指定了模板的功能，支持选项为sql和stdsql，在使用数据库存储的时候会用到。

#### 生成动态文件名
模板可以用来生成动态文件名，就如之前所述，在使用动态文件名的时候，需要在 ACTION 中的模板名称前增加?表明该文件名是动态生成的。

示例：

    $template DynamicFile,"/var/log/test_logs/%timegenerated%-test.log"
    *.* ?DynamicFile

__timegenerated__ 属性从日志信息中提取出消息的时间戳，这样可以为每个日志生成唯一文件名称。

#### 属性
在模板中使用的属性是在 __%__ 之间的内容，使用属性可以访问日志消息中的内容。

    %PROPERTY_NAME[:FROM_CHAR:TO_CHAR:OPTION]%
可用的属性列表见 `man rsyslog.conf`。

### 全局指令
全局指令是rsyslogd守护进程的配置指令。所有的全局指令必须以$开始，每行只能有一个指令，例如：

    $MainMsgQueueSize 50000
*在新的配置格式中(rsyslog v6)，已经不在使用这种方式的指令，但是它们仍然是可用的。*

### 队列
在 __rsyslog__ 中，队列用来传输数据，当 __rsyslog__ 接收到一个消息的时候，首先传递消息预处理器，然后加入到主消息队列，接下来消息会从队列中取出传递给规则处理器。

规则处理器是一个解析过滤引擎，它会基于配置文件中定义的规则，执行相应的动作(action)，每一个动作都有自己的动作队列，消息通过这个队列发送到对应的动作处理器，然后输出。

对于同一个消息来说，可以同时传递这个消息给多个动作队列。

#### 定义队列
在配置文件`/etc/rsyslog.conf`文件中

    $objectQueueType queue_type
这里的队列类型可选值为 direct , linkedlist , fixedarray (内存队列), 或者 disk 。

默认情况下，对于主队列，使用的是FixedArray队列（10000个消息长度），动作队列采用的是direct 队列。

## Then ？ Nginx (Openresty)日志配置
__Openresy__ 的 *resty_logger* 组件，提供了在Openresty的Log阶段，推送数据到syslog-ng服务器上的功能
__Openresty__ 的执行阶段，是一种虚拟化的逻辑业务划分，log阶段应该是所有的 __Openresty__ 执行阶段的最后一个阶段

### openresty 日志处理是如何的
关于执行阶段的顺序如下图
<img src="./Linux-rsyslog-配置/openresty rsyslog.jpg" width="50%" height="50%" alt="rsyslog">

官方示例：
```lua
log_by_lua '
    local logger = require "resty.logger.socket"
    ngx.log(ngx.ERR, "Test Syslog: ", "call")
    if not logger.initted() then
        local ok, err = logger.init {
            host="127.0.0.1",
            port=8110,
            sock_type="udp",
            flush_limit = 1,
            --drop_limit = 5678
        }
        if not ok then
            ngx.log(ngx.ERR, "failed to initialize the logger: ", err)
            return
        end
    end

    -- construct the custom access log message in
    -- the Lua variable "msg"
    local bytes, err = logger.log("test")
    if err then
        ngx.log(ngx.ERR, "failed to log message: ", err)
        return
    end
';
```

从上述可以看出openresty 日志处理主要分成，*syslog服务器信息定义*，*初始化连接*，*写入log数据* 三步

需要注意的是 __flushlimit__ 这个参数，在实际的联动 __Openresty__ 与 __Syslog-ng__ 服务的过程中，可能更希望看到实时写入效果，
比如用 `tail -f` 监控 __syslog-ng__ 端的日志服务，
然后在浏览器中，请求 __Openresty__ 的WEB服务，访问一次, __syslog__ 文件就写入一条，
如果是这样话，需要把 __flushlimit__ ，设置等于1，不然会，等待log数据积攒到一定的数据 *（我们自己指定，>1）* 才向syslog服务器的服务端口推送一次。

### 此阶段有那些数据可输出？

```lua
-- construct the custom access log message in
-- the Lua variable "msg"
local url = ngx.var.uri
local method = ngx.req.get_method()·
local headers = ngx.req.raw_header(true)
-- tbl
local params_var = ngx.req.get_uri_args()
local client_ip = ngx.var.remote_addr
-- tbl
local body_var = ngx.req.get_post_args()
local user_agent = ngx.req.get_headers()["User-Agent"]
local referer = ngx.req.get_headers()["Referer"]
local cookies = ngx.req.get_headers()["Cookie"]
```
如上的API，都可以在这个阶段调用

这样就可以把这些数据，通过“分隔符”推送到 __syslog-ng__ 服务器上，然后用 __logstash__ 安照正则，分词解开，将对应的字段，以 __JSON__ 形式存到 __ES__ 里。

***BTW：Elastic Stack 将在后续中介绍***
