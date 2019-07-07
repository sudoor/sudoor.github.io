---
title: Linux 之 iptables
date: 2016-03-23 17:21:53
categories:
    - Linux
tags:
    - iptables
keywords: Linux iptables
description: Linux 下的 iptables 服务
---
以下内容需要具备Linux基础，并了解常见的网络协议呦!

## iptables 介绍

### netfilter与iptables
&emsp;&emsp;`iptbles` 是一个基于命令行的防火墙工具，采用规则链来允许|阻止网络流量的访问。当一条网络连接试图在你的系统中建立时，`iptables`  会查找其对应的匹配规则。如果找不到，`iptables` 将对其采取默认操作。  

`iptables`主要是调用`netfilter`的数据包内核模块。

&emsp;&emsp;`netfilter` 是Linux 2.4内核一个数据包处理模块，是Linux内核的核心。该框架既简洁又灵活，可实现安全策略应用中的许多功能，如数据包过滤、数据包处理、地址伪装、透明代理、动态网络地址转换(Network Address Translation，NAT)，以及基于用户及媒体访问控制(Media Access Control，MAC)地址的过滤和基于状态的过滤、包速率限制等。 `Iptables/Netfilter`的这些规则可以通过灵活组合，形成非常多的功能、涵盖各个方面。

&emsp;&emsp;`netfilter`是Linux 系统内核用于处理数据包的模块。他具有如下的几点功能：
* 网络地址转换(Network Address Translate)
+ 数据包内容修改
- 数据包过滤的防火墙

`netfilter`是如何进行数据包处理或者在哪些点上进行数据流向处理的呢？在这里我们需要了解什么是`Hook Point`。`Hook Point`是一个数据包通过网卡流经系统内核时会在系统上存在5个`Hook Point`的挂载点，他们分别是：（PRE_ROUTING, INPUT, OUTPUT, FORWARD, POST_ROUTING）

<center>
*netfilter*与*iptables*
<!-- ![iptables-netfilter](/resources/images/iptables-netfilter.png) -->
{% asset_img iptables-netfilter.png iptables-netfilter %}
</center>

&emsp;&emsp;如上图：用户层为我们接触到的一层，`iptables`为Linux系统命令工具集，通过`iptables`命令即可控制操作系统的内核，然后会调用`ip_tables`的内核模块。而`ip_tables`的内核其实就是调用的`netfilter`的内核。在上图我们会发现有个hook，这个hook就是我们刚刚说的`hook point`，一共是五个，每通过一个挂载点的时候就有机会对这个数据包进行对应的更改和对应的操作。然后在图中再往下就是经过网络接口层，调用了系统驱动。

&emsp;&emsp;我们可以通过这三层的模型发现`iptables`实际呢就是`netfilter`内核在操作系统中起到的作用。

### iptables的组成
&emsp;&emsp;`iptables`的组成由： `四张表` ＋ `五条链` ＋ `规则` 组成
>四张表指：`filter`、`nat`、`mangle`、`raw`表
>五条链：`INPUT`、 `OUTPUT`、 `FORWARD`、 `PREROUTING`、 `POSTROUTING`

&emsp;&emsp;首先我们来说说四张表和五条链他们是什么东西，有什么关系：

<center>
<!-- ![四表五链](/resources/images/四表五链.png) -->
{% asset_img 四表五链.png 四表五链 %}
</center>

&emsp;&emsp;我们以上图为例解释，这个四个杯子代表四张表，五条链想成西瓜皮、西瓜子、西瓜汁、西瓜肉等，我们就相当于把西瓜皮、西瓜子放一个杯子，西瓜汁放一个杯子，西瓜肉放一个杯子。像西瓜这各个部分都有不同的作用，这五条链也一样，可以放在这四个表里面。

### 表（tables)
- Nat 表：地址转发
- Filter 表：做访问控制，规则匹配
- Mangle 表：修改数据包，改变包头中内容（TTL，TOS，MARK），需要交换机的支持
- Raw 表：对数据包状态的跟踪与分析

#### filter表
&emsp;&emsp;主要用于对数据包进行过滤，根据具体的规则决定是否放行该数据包（如DROP、ACCEPT、REJECT、LOG）。filter 表对应的内核模块为iptable_filter，包含三个规则链：

- INPUT链：INPUT针对那些目的地是本地的包
- FORWARD链：FORWARD过滤所有不是本地产生的并且目的地不是本地(即本机只是负责转发)的包
- OUTPUT链：OUTPUT是用来过滤所有本地生成的包

#### nat表
&emsp;&emsp;主要用于修改数据包的IP地址、端口号等信息（网络地址转换，如SNAT、DNAT、MASQUERADE、REDIRECT）。属于一个流的包(因为包
的大小限制导致数据可能会被分成多个数据包)只会经过这个表一次。如果第一个包被允许做NAT或Masqueraded，那么余下的包都会自动地被做相同的操作，也就是说，余下的包不会再通过这个表。表对应的内核模块为 iptable_nat，包含三个链：

- PREROUTING链：作用是在包刚刚到达防火墙时改变它的目的地址
- OUTPUT链：改变本地产生的包的目的地址
- POSTROUTING链：在包就要离开防火墙之前改变其源地址

#### mangle表
&emsp;&emsp;主要用于修改数据包的TOS（Type Of Service，服务类型）、TTL（Time To Live，生存周期）指以及为数据包设置Mark标记，以实现Qos(Quality Of Service，服务质量)调整以及策略路由等应用，由于需要相应的路由设备支持，因此应用并不广泛。包含五个规则链
- PREROUTING
- POSTROUTING
- INPUT
- OUTPUT
- FORWARD

#### raw表
&emsp;&emsp;是自1.2.9以后版本的iptables新增的表，主要用于决定数据包是否被状态跟踪机制处理。在匹配数据包时，raw表的规则要优先于其他表。包含两条规则链
- OUTPUT
- PREROUTING

### 链（chains）
&emsp;&emsp;在处理各种数据包时，根据防火墙规则的不同介入时机，iptables供涉及5种默认规则链，从应用时间点的角度理解这些链：

- INPUT链：当接收到防火墙本机地址的数据包（入站）时，应用此链中的规则。
- OUTPUT链：当防火墙本机向外发送数据包（出站）时，应用此链中的规则。
- FORWARD链：当接收到需要通过防火墙发送给其他地址的数据包（转发）时，应用此链中的规则。
- PREROUTING链：在对数据包作路由选择之前，应用此链中的规则，如DNAT。
- POSTROUTING链：在对数据包作路由选择之后，应用此链中的规则，如SNAT。

&emsp;&emsp;其中中INPUT、OUTPUT链更多的应用在“主机防火墙”中，即主要针对服务器本机进出数据的安全控制；而FORWARD、PREROUTING、POSTROUTING链更多的应用在“网络防火墙”中，特别是防火墙服务器作为网关使用时的情况。

&emsp;&emsp;简单介绍完四表五链我们来说说数据包在经过四张表五条链的流向是什么样子的。我们通过一张图来介绍：

<center>
{% asset_img chains.gif chains %}
</center>

<center>
<!-- ![数据包流向](/resources/images/数据包流向.png) -->
{% asset_img 数据包流向.png 数据包流向 %}
</center>

&emsp;&emsp;数据包在流进来的时候都是通过*PREROUTING*这个链，出去都是经过*POSTROUTING*这个链，数据包在进来的时候我们还分两部分，数据包在进来后会有一个路由选择，如果数据包是传给本机的他会进*INPUT*，传给Localhost；如果路由选择发现不是给本机的，而是转发给别的机器的，这个时候就走的*FORWARD*链。经过*INPUT*链的数据包经过应用程序的处理以后就可以经过*OUTPUT*链出去；而走*FORWARD*链的数据包经过这个链的处理完就直接到*OUTPUT*链出去。

&emsp;&emsp;我们可以这么来看，在每一条链里面有一些表的规则可以进行，比如说，我们发现在`PREOUTING`中有`nat`表，所以这个链在数据包经过的时候可以进行目的地址的转发，比如这个数据包的目的地址可以修改，如果我们想要这个数据包转发给别的机器，我们就可以在这个`PROREOUTING`里进行修改就可以走`FORWARD`链了。所以数据包在整个流向上我们可以通过这张图来大致的梳理。

##  Linux数据包路由原理
&emsp;&emsp;我们已经知道了Netfilter和Iptables的架构和作用，并且学习了控制Netfilter行为的Xtables表的结构，那么这个Xtables表是怎么在内核协议栈的数据包路由中起作用的呢？

&emsp;&emsp;网口数据包由底层的网卡NIC接收，通过数据链路层的解包之后(去除数据链路帧头)，就进入了TCP/IP协议栈(本质就是一个处理网络数据包的内核驱动)和Netfilter混合的数据包处理流程中了。数据包的接收、处理、转发流程构成一个有限状态向量机，经过一些列的内核处理函数、以及Netfilter Hook点，最后被转发、或者本次上层的应用程序消化掉。是时候看这张图了：

<center>
{% asset_img iptables-routing.jpg iptables-routing %}
</center>

&emsp;&emsp;从上图中，我们可以总结出以下规律：

&emsp;&emsp;当一个数据包进入网卡时，数据包首先进入PREROUTING链，在PREROUTING链中我们有机会修改数据包的DestIP(目的IP)，然后内核的”路由模块”根据”数据包目的IP”以及”内核中的路由表”判断是否需要转送出去(注意，这个时候数据包的DestIP有可能已经被我们修改过了)

&emsp;&emsp;如果数据包就是进入本机的(即数据包的目的IP是本机的网口IP)，数据包就会沿着图向下移动，到达INPUT链。数据包到达INPUT链后，任何进程都会-收到它
本机上运行的程序也可以发送数据包，这些数据包经过OUTPUT链，然后到达POSTROTING链输出(注意，这个时候数据包的SrcIP有可能已经被我们修改过了)
如果数据包是要转发出去的(即目的IP地址不再当前子网中)，且内核允许转发，数据包就会向右移动，经过FORWARD链，然后到达POSTROUTING链输出(选择对应子网的网口发送出去)

&emsp;&emsp;我们在写Iptables规则的时候，要时刻牢记这张路由次序图，根据所在Hook点的不同，灵活配置规则。


## iptables编写规则(rules)
&emsp;&emsp;对`iptables`的规则主要划分为以下三类：
1. 数据包访问控制：
    - `ACCECPT`:接受，允许数据包通过
    - `DROP`：直接丢弃数据包，不做数据返回
    - `REJECT`：丢弃数据包，并返回一个消息

2. 数据包：
    - `SNAT`：对源地址的改写，发起端的地址改写
    - `DNAT`：对目的地址的改写，数据包要发往哪个地方的地址

3. 信息记录：
    - `LOG`：将对应的访问信息记录成一个log的形式

__防火墙对数据包的处理方式（rules）：__
- `ACCEPT`：允许数据包通过
- `DROP`：直接丢弃数据包，不给任何回应信息
- `REJECT`：拒绝数据包通过，必要时会给数据发送端一个响应的信息。
- `SNAT`：源地址转换。在进入路由层面的route之前，重新改写源地址，目标地址不变，并在本机建立NAT表项，当数据返回时，根据NAT表将目的地址数据改写为数据发送出去时候的源地址，并发送给主机。解决内网用户用同一个公网地址上网的问题。
MASQUERADE，是SNAT的一种特殊形式，适用于像adsl这种临时会变的ip上
- `DNAT`:目标地址转换。和SNAT相反，IP包经过route之后、出本地的网络栈之前，重新修改目标地址，源地址不变，在本机建立NAT表项，当数据返回时，根据NAT表将源地址修改为数据发送过来时的目标地址，并发给远程主机。可以隐藏后端服务器的真实地址。
REDIRECT：是DNAT的一种特殊形式，将网络包转发到本地host上（不管IP头部指定的目标地址是啥），方便在本机做端口转发。
- `LOG`：在/var/log/messages文件中记录日志信息，然后将数据包传递给下一条规则
除去最后一个LOG，前3条规则匹配数据包后，该数据包不会再往下继续匹配了，所以编写的规则顺序极其关键。

&emsp;&emsp;我们介绍完四表五链和规则之后，来看下图

<center>
<!-- ![rules](/resources/images/rules.png) -->
{% asset_img rules.png rules %}
</center>

&emsp;&emsp;`iptables`一个iptables命令行由以下部分组成

- [-t 表名]：该规则所操作的哪个表，可以使用filter、nat等，如果没有指定则默认为filter
- -A：新增一条规则，到该规则链列表的最后一行
- -I：插入一条规则，原本该位置上的规则会往后顺序移动，没有指定编号则为1
- -D：从规则链中删除一条规则，要么输入完整的规则，或者指定规则编号加以删除
- -R：替换某条规则，规则替换不会改变顺序，而且必须指定编号。
- -P：设置某条规则链的默认动作
- -nL：-L、-n，查看当前运行的防火墙规则列表
- chain名：指定规则表的哪个链，如INPUT、OUPUT、FORWARD、PREROUTING等
- [规则编号]：插入、删除、替换规则时用，--line-numbers显示号码
- [-i|o 网卡名称]：i是指定数据包从哪块网卡进入，o是指定数据包从哪块网卡输出
- [-p 协议类型]：可以指定规则应用的协议，包含tcp、udp和icmp等
- [-s 源IP地址]：源主机的IP地址或子网地址
- [--sport 源端口号]：数据包的IP的源端口号
- [-d目标IP地址]：目标主机的IP地址或子网地址
- [--dport目标端口号]：数据包的IP的目标端口号
- -m：extend matches，这个选项用于提供更多的匹配参数，如：
- -m state –state ESTABLISHED,RELATED
- -m tcp –dport 22
- -m multiport –dports 80,8080
- -m icmp –icmp-type 8
- <-j 动作>：处理数据包的动作，包括ACCEPT、DROP、REJECT等


### 链管理命令
- -P :设置默认策略的（设定默认门是关着的还是开着的）
默认策略一般只有两种
_iptables -P INPUT (DROP|ACCEPT)  默认是关的/默认是开的_

比如：
iptables -P INPUT DROP 这就把默认规则给拒绝了。并且没有定义哪个动作，所以关于外界连接的所有规则包括Xshell连接之类的，远程连接都被拒绝了。

- -F: FLASH，清空规则链的(注意每个链的管理权限)
_iptables -t nat -F PREROUTING_
_iptables -t nat -F 清空nat表的所有链_

- -N:NEW 支持用户新建一个链
iptables -N inbound_tcp_web 表示附在tcp表上用于检查web的。

- -X: 用于删除用户自定义的空链
使用方法跟-N相同，但是在删除之前必须要将里面的链给清空昂了

- -E：用来Rename chain主要是用来给用户自定义的链重命名
_-E oldname newname_

- -Z：清空链，及链中默认规则的计数器的（有两个计数器，被匹配到多少个数据包，多少个字节）
_iptables -Z :清空_

#### 规则管理命令
- -A：追加，在当前链的最后新增一个规则
- -I num : 插入，把当前规则插入为第几条。
- -I 3 :插入为第三条
- -R num：Replays替换/修改第几条规则
_格式：iptables -R 3 …………_
- -D num：删除，明确指定删除第几条规则

#### 查看管理命令 “-L”
附加子命令
- -n：以数字的方式显示ip，它会将ip直接显示出来，如果不加-n，则会将ip反向解析成主机名。
- -v：显示详细信息
- -vv
- -vvv :越多越详细
- -x：在计数器上显示精确值，不做单位换算
- --line-numbers : 显示规则的行号
- -t nat：显示所有的关卡的信息


### 匹配标准

#### 通用匹配：源地址目标地址的匹配
- -s：指定作为源地址匹配，这里不能指定主机名称，必须是IP
IP | IP/MASK | 0.0.0.0/0.0.0.0

而且地址可以取反，加一个“!”表示除了哪个IP之外
- -d：表示匹配目标地址
- -p：用于匹配协议的（这里的协议通常有3种，TCP/UDP/ICMP）

流入一般用在INPUT和PREROUTING上
- -i eth0：从这块网卡流入的数据

流出一般在OUTPUT和POSTROUTING上
- -o eth0：从这块网卡流出的数据

#### 隐含扩展：对协议的扩展
- -p tcp :TCP协议的扩展。一般有三种扩展
- --dport XX-XX：指定目标端口,不能指定多个非连续端口,只能指定单个端口，比如
- --dport 21  或者 --dport 21-23 (此时表示21,22,23)
- --sport：指定源端口
- --tcp-fiags：TCP的标志位（SYN,ACK，FIN,PSH，RST,URG）

对于它，一般要跟两个参数：
- 检查的标志位
- 必须为1的标志位
> --tcpflags syn,ack,fin,rst syn   =    --syn

表示检查这4个位，这4个位中syn必须为1，其他的必须为0。所以这个意思就是用于检测三次握手的第一次包的。对于这种专门匹配第一包的SYN为1的包，还有一种简写方式，叫做--syn

- -p udp：UDP协议的扩展
- --dport
- --sport
- -p icmp：icmp数据报文的扩展
- --icmp-type：
- echo-request(请求回显)，一般用8 来表示
- --icmp-type 8 匹配请求回显数据包
- echo-reply （响应的数据包）一般用0来表示

#### 显式扩展（-m）
扩展各种模块
    -m multiport：表示启用多端口扩展
之后我们就可以启用比如 --dports 21,23,80


### -j ACTION  
&emsp;&emsp;常用的ACTION：
- DROP：悄悄丢弃 *一般我们多用DROP来隐藏我们的身份，以及隐藏我们的链表*
- REJECT：明示拒绝
- ACCEPT：接受
- custom_chain：转向一个自定义的链
- DNAT
- SNAT
- MASQUERADE：源地址伪装
- REDIRECT：重定向：主要用于实现端口重定向
- MARK：打防火墙标记的
- RETURN：返回 *在自定义链执行完毕后使用返回，来返回原规则链。*

### 状态检测：
&emsp;&emsp;是一种显式扩展，用于检测会话之间的连接关系的，有了检测我们可以实现会话间功能的扩展
&emsp;&emsp;什么是状态检测？对于整个TCP协议来讲，它是一个有连接的协议，三次握手中，第一次握手，我们就叫NEW连接，而从第二次握手以后的，ack都为1，这是正常的数据传输，和tcp的第二次第三次握手，叫做已建立的连接（ESTABLISHED）,还有一种状态，比较诡异的，比如：SYN=1 ACK=1 RST=1,对于这种我们无法识别的，我们都称之为INVALID无法识别的。还有第四种，FTP这种古老的拥有的特征，每个端口都是独立的，21号和20号端口都是一去一回，他们之间是有关系的，这种关系我们称之为RELATED。
所以我们的状态一共有四种：
- NEW
- ESTABLISHED
- RELATED
- INVALID
