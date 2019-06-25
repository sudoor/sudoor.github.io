---
title: Redis 集群与高可用方案
date: 2015-11-10 00:05:07
update: 2016-01-28 19:07:56
categories:
    - 集群
    - 高可用
tags:
    - redis
keywords: 
    - 集群 
    - redis 
    - 高可用
description: 
    redis它使用内存提供主存储支持，而仅使用硬盘做持久性的存储；它的数据模型非常独特，用的是单线程。
    而在我们的生产上redis用的最多的地方便是作为高速缓存服务，这对redis的高可用性有了很高的要求。
---

之前了解了`Redis` 常用命令，再来看看`Redis`的 _性能调优_ 与 _高可用方案_

## Redis 性能调优

尽管 Redis 是一个非常快速的内存数据存储媒介，也并不代表 Redis 不会产生性能问题。
`Redis` 采用单线程模型，所有的命令都是由一个线程串行执行的，所以当某个命令执行耗时较长时，会拖慢其后的所有命令，这使得 `Redis` 对每个任务的执行效率更加敏感。

针对 `Redis 的性能优化，主要从下面几个层面入手：

- 确保没有让 `Redis` 执行耗时长的命令
- 使用 `pipelining` 将连续执行的命令组合执行
- 操作系统的 `Transparent huge pages` 功能必须关闭：`echo never > /sys/kernel/mm/transparent_hugepage/enabled`
- 检查数据持久化策略
- 引入读写分离

### 长耗时命令
`Redis` 绝大多数读写命令的时间复杂度都在 `O(1)` 到 `O(N)` 之间，在文本和官方文档中均对每个命令的时间复杂度有说明。

通常来说，`O(1)` 的命令是安全的，`O(N)` 命令在使用时需要注意，如果 N 的数量级不可预知，则应避免使用。
例如对一个 `field` 数未知的`Hash` 数据执行 `HGETALL`/`HKEYS`/`HVALS` 命令，通常来说这些命令执行的很快，但如果这个 `Hash` 中的 `field` 数量极多，耗时就会成倍增长。

又如使用 `SUNION` 对两个 `Set` 执行 `Union` 操作，或使用 `SORT` 对 `List`/`Set` 执行排序操作等时，都应该严加注意。

### 避免在使用这些 `O(N)` 命令时发生问题主要有几个办法

- 不要把 List 当做列表使用，仅当做队列来使用
- 通过机制严格控制 `Hash`、`Set`、`Sorted Set` 的大小
- 可能的话，将排序、并集、交集等操作放在客户端执行
- 绝对禁止使用 `KEYS` 命令
- 避免一次性遍历集合类型的所有成员，而应使用 `SCAN` 类的命令进行分批的，游标式的遍历

`Redis` 提供了 `SCAN` 命令，可以对 Redis 中存储的所有 `key` 进行游标式的遍历，避免使用 `KEYS` 命令带来的性能问题。
同时还有 `SSCAN`/`HSCAN`/`ZSCAN` 等命令，分别用于对 `Set`/`Hash`/`Sorted Set` 中的元素进行游标式遍历。
`SCAN` 类命令的使用请参考官方文档：[Redis SCAN](https://redis.io/commands/scan 'Redis SCAN')

`Redis` 提供了 `Slow Log` 功能，可以自动记录耗时较长的命令。相关的配置参数有两个：
1. `slowlog-log-slower-than xxxms`  #执行时间慢于xxx毫秒的命令计入
2. `Slow Logslowlog-max-len xxx ` #Slow Log的长度，即最大纪录多少条Slow Log

使用 `SLOWLOG GET [number] `命令，可以输出最近进入 `Slow Log` 的 `number` 条命令。
使用 `SLOWLOG RESET` 命令，可以重置`Slow Log`

### 网络引发的延迟

尽可能使用长连接或连接池，避免频繁创建销毁连接
客户端进行的批量数据操作，应使用 `Pipeline` 特性在一次交互中完成。

### 数据持久化引发的延迟

`Redis` 的数据持久化工作本身就会带来延迟，需要根据数据的安全级别和性能要求制定合理的持久化策略：

`AOF` + `fsync always` 的设置虽然能够绝对确保数据安全，但每个操作都会触发一次 `fsync`，会对 `Redis` 的性能有比较明显的影响
`AOF` + `fsync every second` 是比较好的折中方案，每秒 `fsync` 一次
`AOF` + `fsync never` 会提供 `AOF` 持久化方案下的最优性能
使用 `RDB` 持久化通常会提供比使用 `AOF` 更高的性能，但需要注意 `RDB `的策略配置
每一次 `RDB` 快照和 `AOF Rewrite` 都需要 `Redis` 主进程进行 `fork` 操作。
`fork` 操作本身可能会产生较高的耗时，与 `CPU` 和 `Redis` 占用的内存大小有关。
根据具体的情况合理配置 `RDB` 快照和 `AOF Rewrite` 时机，避免过于频繁的 `fork` 带来的延迟
`Redis` 在 `fork` 子进程时需要将内存分页表拷贝至子进程，以占用了 `24GB` 内存的 `Redis` 实例为例，共需要拷贝 `24GB / 4kB * 8 = 48MB` 的数据。

可以通过 `INFO` 命令返回的 `latest_fork_usec` 字段查看上一次 `fork` 操作的耗时（微秒）

### Swap 引发的延迟

当 `Linux` 将 `Redis` 所用的内存分页移至 `swap` 空间时，将会阻塞 `Redis` 进程，导致 `Redis` 出现不正常的延迟。
`Swap` 通常在物理内存不足或一些进程在进行大量 I/O 操作时发生，应尽可能避免上述两种情况的出现。
`/proc//smaps` 文件中会保存进程的 `swap` 记录，通过查看这个文件，能够判断 `Redis` 的延迟是否由 `Swap` 产生。
如果这个文件中记录了较大的 `Swap size`，则说明延迟很有可能是 `Swap` 造成的。

### 数据淘汰引发的延迟
当同一秒内有大量 `key` 过期时，也会引发 `Redis` 的延迟。在使用时应尽量将 `key` 的失效时间错开。

### 引入读写分离机制
`Redis` 的主从复制能力可以实现一主多从的多节点架构，在这一架构下，主节点接收所有写请求，并将数据同步给多个从节点。
在这一基础上，我们可以让从节点提供对实时性要求不高的读请求服务，以减小主节点的压力。
尤其是针对一些使用了长耗时命令的统计类任务，完全可以指定在一个或多个从节点上执行，避免这些长耗时命令影响其他请求的响应。

## 主从复制与集群分片

## 主从复制
`Redis` 支持一主多从的主从复制架构。一个 `Master` 实例负责处理所有的写请求，`Master` 将写操作同步至所有 `Slave`。
借助 `Redis` 的主从复制，可以实现读写分离和高可用：

实时性要求不是特别高的读请求，可以在 `Slave` 上完成，提升效率。
特别是一些周期性执行的统计任务，这些任务可能需要执行一些长耗时的 `Redis` 命令，可以专门规划出 1 个或几个 `Slave` 用于服务这些统计任务
借助 `Redis Sentinel` 可以实现高可用，当 `Master` crash 后，`Redis Sentinel` 能够自动将一个 `Slave` 晋升为 `Master`，继续提供服务

> 启用主从复制非常简单，只需要配置多个 `Redis` 实例，在作为 `Slave` 的 `Redis` 实例中配置：
> ```slaveof 192.168.1.1 6379  #指定Master的IP和端口```
> 当 `Slave` 启动后，会从 `Master` 进行一次冷启动数据同步，由 `Master` 触发 `BGSAVE` 生成 `RDB` 文件推送给 `Slave` 进行导入，
> 导入完成后 `Master` 再将增量数据通过 `Redis Protocol` 同步给 `Slave`。之后主从之间的数据便一直以 `Redis Protocol` 进行同步

## 使用 Sentinel 做自动 failover

`Redis` 的主从复制功能本身只是做数据同步，并不提供监控和自动 `failover` 能力，要通过主从复制功能来实现 `Redis` 的高可用，还需要引入一个组件：`Redis Sentinel`
`Redis Sentinel` 是 `Redis` 官方开发的监控组件，可以监控 `Redis` 实例的状态，通过 `Master` 节点自动发现 `Slave` 节点，并在监测到 `Master` 节点失效时选举出一个新的 `Master`，并向所有 `Redis` 实例推送新的主从配置。

`Redis Sentinel` 需要至少部署 _3_ 个实例才能形成选举关系。

___关键配置___

```
sentinel monitor mymaster 127.0.0.1 6379 2  #Master实例的IP、端口，以及选举需要的赞成票数
sentinel down-after-milliseconds mymaster 60000  #多长时间没有响应视为Master失效
sentinel failover-timeout mymaster 180000  #两次failover尝试间的间隔时长
sentinel parallel-syncs mymaster 1  #如果有多个Slave，可以通过此配置指定同时从新Master进行数据同步的Slave数，避免所有Slave同时进行数据同步导致查询服务也不可用
```

另外需要注意的是，`Redis Sentinel` 实现的自动 `failover` 不是在同一个 `IP` 和端口上完成的，
也就是说自动 `failover` 产生的新 `Master` 提供服务的 `IP` 和端口与之前的 `Master` 是不一样的，
所以要实现 `HA`，还要求客户端必须支持 `Sentinel`，能够与 `Sentinel `交互获得新 `Master` 的信息才行。

## 集群分片

### 为何要做集群分片：

`Redis` 中存储的数据量大，一台主机的物理内存已经无法容纳
`Redis` 的写请求并发量大，一个 `Redis` 实例以无法承载

当上述两个问题出现时，就必须要对 `Redis` 进行分片了。

`Redis` 的分片方案有很多种，例如很多 `Redis` 的客户端都自行实现了分片功能，也有向 `Twemproxy` 这样的以代理方式实现的 `Redis` 分片方案。
然而首选的方案还应该是 `Redis` 官方在 __3.0__ 版本中推出的 `Redis Cluster` 分片方案。

此处不会对 `Redis Cluster` 的具体安装和部署细节进行介绍，重点介绍 `Redis Cluster` 带来的好处与弊端。

### Redis Cluster 的能力

1. 能够自动将数据分散在多个节点上
1. 当访问的 `key` 不在当前分片上时，能够自动将请求转发至正确的分片
1. 当集群中部分节点失效时仍能提供服务

其中第三点是基于主从复制来实现的，`Redis Cluster` 的每个数据分片都采用了主从复制的结构，原理和前文所述的主从复制完全一致，
唯一的区别是省去了 `Redis Sentinel` 这一额外的组件，由 `Redis Cluster` 负责进行一个分片内部的节点监控和自动 `failover`。

### Redis Cluster 分片原理

`Redis Cluster` 中共有 `16384` 个 `hash slot`，`Redis` 会计算每个 `key` 的 `CRC16`，将结果与 `16384` 取模，来决定该 `key` 存储在哪一个 `hash slot` 中，
同时需要指定 `Redis Cluster` 中每个数据分片负责的` Slot `数。`Slot `的分配在任何时间点都可以进行重新分配。

客户端在对 `key` 进行读写操作时，可以连接 `Cluster` 中的任意一个分片，如果操作的 `key` 不在此分片负责的 `Slot` 范围内，`Redis Cluster` 会自动将请求重定向到正确的分片上。

### hash tags
在基础的分片原则上，`Redis` 还支持 `hash tags` 功能，以 `hash tags` 要求的格式明明的 `key`，将会确保进入同一个 `Slot` 中。
例如：`{uiv}user:1000` 和 `{uiv}user:1001 `拥有同样的 `hash tag {uiv}`，会保存在同一个 `Slot` 中。
使用 `Redis Cluster` 时，`pipelining`、`事务`和 `LUA Script` 功能涉及的 `key` 必须在同一个数据分片上，否则将会返回错误。
如要在 `Redis Cluster` 中使用上述功能，就必须通过 `hash tags` 来确保一个 `pipeline` 或一个事务中操作的所有 `key` 都位于同一个 `Slot` 中。

有一些客户端 __（如 `Redisson`）__ 实现了集群化的 `pipelining` 操作，可以自动将一个 `pipeline` 里的命令按 `key` 所在的分片进行分组，分别发到不同的分片上执行。
但是 `Redis` 不支持跨分片的事务，`事务`和` LUA Script` 还是必须遵循所有 `key` 在一个分片上的规则要求。

### 主从复制 vs 集群分片
如何在主从复制和集群分片两种部署方案中取舍呢？
从各个方面看，`Redis Cluster` 都是优于主从复制的方案

1. `Redis Cluster` 能够解决单节点上数据量过大的问题
1. `Redis Cluster` 能够解决单节点访问压力过大的问题
1. `Redis Cluster` 包含了主从复制的能力


当然，采用 `Redis Cluster` 也有缺点

- 维护难度增加。
    在使用 `Redis Cluster` 时，需要维护的 `Redis` 实例数倍增，需要监控的主机数量也相应增加，数据备份 / 持久化的复杂度也会增加。
    同时在进行分片的增减操作时，还需要进行 `reshard` 操作，远比主从模式下增加一个 `Slave` 的复杂度要高。

- 客户端资源消耗增加。
    当客户端使用连接池时，需要为每一个数据分片维护一个连接池，客户端同时需要保持的连接数成倍增多，加大了客户端本身和操作系统资源的消耗。

- 性能优化难度增加。
    可能需要在多个分片上查看 `Slow Log` 和 `Swap` 日志才能定位性能问题。

- `事务`和 `LUA Script` 的使用成本增加。
    在 `Redis Cluster` 中使用事务和` LUA Script` 特性有严格的限制条件，`事务`和 `Script `中操作的 `key `必须位于同一个分片上，这就使得在开发时必须对相应场景下涉及的 `key` 进行额外的规划和规范要求。


所以说，要根据业务量大小合理使用`主从复制`和`Redis Cluster`。

### 一些建议
- 需要在 `Redis` 中存储的数据有多大？
- 未来 2 年内可能发展为多大？
- 这些数据是否都需要长期保存？
- 是否可以使用 `LRU` 算法进行非热点数据的淘汰？
- 综合考虑前面几个因素，评估出 `Redis` 需要使用的物理内存。

- 用于部署 `Redis` 的主机物理内存有多大？
- 有多少可以分配给 `Redis` 使用？
- 对比 (1) 中的内存需求评估，是否足够用？

- `Redis` 面临的并发写压力会有多大？
- 在不使用 `pipelining` 时，`Redis` 的写性能可以超过 10 万次 / 秒（更多的 `benchmark` 可以参考 [Redis benchmark](https://redis.io/topics/benchmarks 'Redis benchmark') ）
- 在使用 `Redis` 时，是否会使用到 `pipelining` 和`事务`功能？
- 使用的场景多不多？

- 综合上面几点考虑，如果单台主机的可用物理内存完全足以支撑对 `Redis` 的容量需求，
- 且`Redis` 面临的并发写压力距离 `Benchmark` 值还尚有距离，建议采用主从复制的架构，可以省去很多不必要的麻烦。
- 同时，如果应用中大量使用 `pipelining` 和事务，也建议尽可能选择主从复制架构，可以减少设计和开发时的复杂度。
