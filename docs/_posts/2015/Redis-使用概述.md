---
title: Redis 使用概述
comments: true
date: 2015-07-28 19:07:56
update: 2015-07-28 20:07:56
categories:
    - 缓存
    - NoSQL
tags:
    - redis
keywords:
    - NoSQL
    - redis
description:
    redis 是一个基于内存管理的NoSQL 数据库。常用来作为缓存，实时数据暂存等服务。

---

## Redis 优点

`Redis`是一个开源的，先进的 `key-value` 存储可用于构建高性能的存储解决方案。
`Redi` 支持数据结构有`字符串`，`哈希`，`链表`，`集合`，`有序集合`，`带有范围查询的排序集`，`位图`，`Hyperloglogs` `超文本和具有半径查询的地理空间索引` 。 
`Redis` 是 `NoSQL`，Not Only SQL，泛指非关系型的数据库。___Redis是一种 `NoSQL`.___

`Redis` 是单线程的， 同时使用非阻塞的IO，兼顾优化了指令的时间复杂度。

因此， 
- `Redis` 是线程安全的（单线程线程），其所有操作都是原子的，不会因并发产生数据异常
- `Redis` 的速度非常快（因为使用非阻塞式 IO，且大部分命令的算法时间复杂度都是 O(1))

`Redis` 具备 `LRU` 淘汰、事务实现、以及不同级别的硬盘持久化等能力, 支持 `AOF持久`化与`RDB持久化`。 _（详细见[Redis 持久化](../../../0810/2015/Redis持久化 'Redis 持久化')）_

`Redis` 支持副本集和通过 `Redis Sentinel(2.X)` 实现的高可用方案，支持通过 `Redis Cluster(3.X)` 实现的数据自动分片能力。

## Redis 数据结构
`Redis` 具有多种数据结构，包括`字符串`、`哈希表`、`链表`、`集合`、`有序集合`、`位图`、`Hyperloglogs` 等。

## Redis 常用命令
完整的 `Redis` 命令集请参考官方文档：[redis官方指令参考](https://redis.io/commands 'edis官方指令')

### Key
`Redis` 采用 `Key-Value` 型的基本数据结构，任何`二进制序列`都可以作为 `Redis` 的 `Key` 使用（例如普通的字符串或一张序列化 `JPEG` 图片）

- 关于 `Key` 的一些注意事项：
不要使用过长的 `Key`。过长的`Key`不仅会消耗更多的内存，还会导致查找的效率降低 建议使用 `object-type:id:attr` 这类的`key`.
`Redis` 允许的最大 `Key` 长度是 512MB（对 Value 的长度限制也是 512MB）

### String 类型命令
`Redis` 没有 `Int`、`Float`、`Boolean` 等数据类型的概念，所有的基本类型在 `Redis` 中都以 `String` 体现。

与 `String` 相关的常用命令：
- `SET`：为一个 `Key` 设置 value，可以配合 EX/PX 参数指定 `Key` 的有效期，通过 NX/XX 参数针对 `Key` 是否存在的情况进行区别操作，时间复杂度 `O(1)`
- `GET`：获取某个 `Key` 对应的 value，时间复杂度 `O(1)`
- `GETSET`：为一个 `Key` 设置 value，并返回该 `Key` 的原 value，时间复杂度 `O(1)`
- `MSET`：为多个 `Key` 设置 value，时间复杂度 `O(N)`
- `MSETNX`：同 MSET，如果指定的 `Key` 中有任意一个已存在，则不进行任何操作，时间复杂度 `O(N)`
- `MGET`：获取多个 `Key` 对应的 `value`，时间复杂度 `O(N)`

`Redis` 可以把 `String` 作为整型或浮点型数字来使用，主要体现在 `INCR`、`DECR` 类的命令上：

- `INCR`：将 `Key` 对应的 value 值自增 1，并返回自增后的值。只对可以转换为整型的 `String` 数据起作用。时间复杂度 `O(1)`
- `INCRBY`：将 `Key` 对应的 value 值自增指定的整型数值，并返回自增后的值。只对可以转换为整型的 `String` 数据起作用。时间复杂度 `O(1)`
- `DECR`/`DECRBY`：同 `INCR`/`INCRBY`，自增改为自减。

`INCR`/`DECR` 系列命令要求操作的 value 类型为 String，并可以转换为 64 位带符号的整型数字，否则会返回错误。

也就是说，进行 `INCR`/`DECR` 系列命令的 value，必须在 `-2^63 ~ 2^63 - 1` 范围内。
因为 `Redis` 单线程的， 所以其线程是安全的，所以 INCR/DECR 命令可以在高并发下的确控制。


- 例 1：库存控制

在高并发场景下实现库存余量的精准校验，确保不出现超卖的情况。

设置库存总量：

`SET inv:remain "100"`
库存扣减 + 余量校验：

`DECR inv:remain`
当 `DECR` 命令返回值大于等于 0 时，说明库存余量校验通过，如果返回小于 0 的值，则说明库存已耗尽。

假设同时有 300 个并发请求进行库存扣减，`Redis` 能够确保这 300 个请求分别得到 99 到 - 200 的返回值，每个请求得到的返回值都是唯一的，绝对不会找出现两个请求得到一样的返回值的情况。

- 例 2：自增序列生成

实现类似于 `RDBMS` 的 `Sequence` 功能，生成一系列唯一的序列号

设置序列起始值：

`SET sequence "10000"`
获取一个序列值：

`INCR sequence`
直接将返回值作为序列使用即可。

获取一批（如 100 个）序列值：

`INCRBY sequence 100`
假设返回值为 N，那么 [N - 99 ~ N] 的数值都是可用的序列值。

当多个客户端同时向 `Redis` 申请自增序列时，`Redis` 能够确保每个客户端得到的序列值或序列范围都是全局唯一的，绝对不会出现不同客户端得到了重复的序列值的情况。

### List 类型命令

`Redis` 的 `List` 是链表型的数据结构，可以使用 `LPUSH`/`RPUSH`/`LPOP`/`RPOP` 等命令在 `List` 的两端执行插入元素和弹出元素的操作。
虽然 `List` 也支持在特定 index 上插入和读取元素的功能，但其时间复杂度较高`（O(N)）`，应小心使用。

与 `List` 相关的常用命令：

- `LPUSH`：向指定 `List` 的左侧（即头部）插入 1 个或多个元素，返回插入后的 `List`长度。时间复杂度` O(N)`，N 为插入元素的数量
- `RPUSH`：同 `LPUSH`，向指定 `List` 的右侧（即尾部）插入 1 或多个元素
- `LPOP`：从指定 `List` 的左侧（即头部）移除一个元素并返回，时间复杂度 `O(1)`
- `RPOP`：同 `LPOP`，从指定 `List` 的右侧（即尾部）移除 1 个元素并返回
- `LPUSHX`/`RPUSHX`：与 `LPUSH`/`RPUSH` 类似，区别在于，`LPUSHX`/`RPUSHX` 操作的 `Key` 如果不存在，则不会进行任何操作
- `LLEN`：返回指定 `List` 的长度，时间复杂度 `O(1)`
- `LRANGE`：返回指定 `List` 中指定范围的元素（双端包含，即 `LRANGE key 0 10` 会返回 11 个元素），时间复杂度 `O(N)`。
应尽可能控制一次获取的元素数量，一次获取过大范围的 `List` 元素会导致延迟，同时对长度不可预知的 `List`.
避免使用 `LRANGE key 0 -1` 这样的完整遍历操作。

#### 应谨慎使用的 List 相关命令

- `LINDEX`：返回指定 `List` 指定 index 上的元素，如果 index 越界，返回 nil。
index 数值是回环的，即 - 1 代表 `List` 最后一个位置，-2 代表 `List` 倒数第二个位置。时间复杂度 `O(N)`
- `LSET`：将指定 `List` 指定 index 上的元素设置为 value，如果 index 越界则返回错误，时间复杂度 `O(N)`，如果操作的是头 / 尾部的元素，则时间复杂度为`O(1)`
- `LINSERT`：向指定 `List` 中指定元素之前 / 之后插入一个新元素，并返回操作后的 `List` 长度。如果指定的元素不存在，返回 - 1。如果指定 `Key` 不存在，不会进行任何操作，时间复杂度 `O(N)`

由于 `Redis` 的 `List` 是链表结构的，上述的三个命令的算法效率较低，需要对 `List` 进行遍历，命令的耗时无法预估，在 `List` 长度大的情况下耗时会明显增加，应谨慎使用。
换句话说，`Redis` 的 `List` 实际是设计来用于实现队列，而不是用于实现类似 `ArrayList` 这样的列表的。如果你不是想要实现一个双端出入的队列，那么请尽量不要使用 `Redis` 的 `List` 数据结构。

为了更好支持队列的特性，`Redis` 还提供了一系列阻塞式的操作命令，如 `BLPOP`/`BRPOP` 等，能够实现类似于 `BlockingQueue` 的能力，即在 `List` 为空时，阻塞该连接，直到` List` 中有对象可以出队时再返回。
针对阻塞类的命令，请参考官方文档 [阻塞命令](https://redis.io/topics/data-types-intro '阻塞命令')中 __Blocking operations on lists__ 一节。

### Hash 类型命令

`Hash` 即哈希表，`Redis` 的 `Hash` 和传统的哈希表一样，是一种 `field-value` 型的数据结构，可以理解成将 `HashMap` 搬入 `Redis`。

`Hash` 非常适合用于表现对象类型的数据，用 `Hash` 中的 `field` 对应对象的 `field` 即可。
`Hash` 的优点包括：

1. 可以实现二元查找，如 _查找 ID 为 1000 的用户的年龄_
比起将整个对象序列化后作为 `String` 存储的方法，Hash 能够有效地减少网络传输的消耗

2. 当使用 `Hash` 维护一个集合时，提供了比 `List` 效率高得多的随机访问命令

与 `Hash` 相关的常用命令：

- `HSET`：将 `Key` 对应的 `Hash` 中的 field 设置为 value。如果该`Hash` 不存在，会自动创建一个。时间复杂度 `O(1)`
- `HGET`：返回指定 `Hash` 中 field 字段的值，时间复杂度 O(1)
- `HMSET`/`HMGET`：同 `HSET` 和 `HGET`，可以批量操作同一个 `Key` 下的多个 field，时间复杂度：`O(N)`，N 为一次操作的 field 数量
- `HSETNX`：同 HSET，但如 field 已经存在，HSETNX 不会进行任何操作，时间复杂度 `O(1)`
- `HEXISTS`：判断指定 `Hash` 中 field 是否存在，存在返回 1，不存在返回 0，时间复杂度 `O(1)`
- `HDEL`：删除指定 `Hash` 中的 field（1 个或多个），时间复杂度：`O(N)`，N 为操作的 field 数量
- `HINCRBY`：同 `INCRBY`命令，对指定 `Hash` 中的一个 field 进行 `INCRBY`，时间复杂度 `O(1)`

#### 应谨慎使用的 `Hash` 相关命令

`HGETALL`：返回指定 `Hash` 中所有的 `field-value` 对。返回结果为数组，数组中 `field` 和 `value` 交替出现。时间复杂度 `O(N)`
`HKEYS`/`HVALS`：返回指定 `Hash` 中所有的 `field/value`，时间复杂度 `O(N)`

上述三个命令都会对 `Hash` 进行完整遍历，`Hash` 中的 field 数量与命令的耗时线性相关，对于尺寸不可预知的 `Hash`，
应严格避免使用上面三个命令，而改为使用 `HSCAN` 命令进行游标式的遍历，具体请见 [Redis HSCAN](https://redis.io/commands/scan 'redis HSCAN')

### Set 类型命令

`Redis` `Set` 是无序的，不可重复的 `String` 集合。

与 Set 相关的常用命令：

- `SADD`：向指定 `Set` 中添加 1 个或多个 member，如果指定 Set 不存在，会自动创建一个。时间复杂度 `O(N)`，N 为添加的 member 个数
- `SREM`：从指定`Set` 中移除 1 个或多个 member，时间复杂度 `O(N)`，N 为移除的 member 个数
- `SRANDMEMBER`：从指定 `Set` 中随机返回 1 个或多个 member，时间复杂度 `O(N)`，N 为返回的 member 个数
- `SPOP`：从指定 `Set` 中随机移除并返回 count 个 member，时间复杂度 `O(N)`，N 为移除的 member 个数
- `SCARD`：返回指定 `Set` 中的 member 个数，时间复杂度 `O(1)`
- `SISMEMBER`：判断指定的 value 是否存在于指定 `Set` 中，时间复杂度 `O(1)`
- `SMOVE`：将指定 member 从一个 `Set` 移至另一个 `Set`

#### 应慎用的 `Set` 相关命令：

- `SMEMBERS`：返回指定 `Hash` 中所有的 member，时间复杂度 `O(N)`
- `SUNION`/`SUNIONSTORE`：计算多个 `Set` 的并集并返回 / 存储至另一个 `Set` 中，时间复杂度 `O(N)`，N 为参与计算的所有集合的总 member 数
- `SINTER`/`SINTERSTORE`：计算多个 `Set` 的交集并返回 / 存储至另一个 `Set` 中，时间复杂度 `O(N)`，N 为参与计算的所有集合的总 member 数
- `SDIFF`/`SDIFFSTORE`：计算 1 个 `Set` 与 1 或多个 `Set` 的差集并返回 / 存储至另一个 `Set` 中，时间复杂度 `O(N)`，N 为参与计算的所有集合的总 member 数。

上述几个命令涉及的计算量大，应谨慎使用，特别是在参与计算的 `Set` 尺寸不可知的情况下，应严格避免使用。
可以考虑通过 `SSCAN` 命令遍历获取相关 `Set` 的全部 member（具体请见 [Redis scan](https://redis.io/commands/scan 'redis scan') ），如果需要做`并集` / `交集` / `差集`计算，可以在客户端进行，或在不服务实时查询请求的 `Slave` 上进行。

### Sorted Set 类型命令

`Redis` `Sorted Set` 是有序的、不可重复的 `String` 集合。
`Sorted Set` 中的每个元素都需要指派一个分数 `(score)`，`Sorted Set` 会根据 `score `对元素进行升序排序。
如果多个 member 拥有相同的 `score`，则以字典序进行升序排序。
`Sorted Set` 非常适合用于实现排名。

- `Sorted Set` 的主要命令：

- `ZADD`：向指定 `Sorted Set` 中添加 1 个或多个 member，时间复杂度 `O(Mlog(N))`，M 为添加的 member 数量，N 为 `Sorted Set` 中的 member 数量
- `ZREM`：从指定 `Sorted Set` 中删除 1 个或多个 member，时间复杂度 `O(Mlog(N))`，M 为删除的 member 数量，N 为 `Sorted Set` 中的 member 数量
- `ZCOUNT`：返回指定 `Sorted Set` 中指定 score 范围内的 member 数量，时间复杂度：`O(log(N))`
- `ZCARD`：返回指定 `Sorted Set` 中的 member 数量，时间复杂度 `O(1)`
- `ZSCORE`：返回指定 `Sorted Set` 中指定 member 的 score，时间复杂度 `O(1)`
- `ZRANK`/`ZREVRANK`：返回指定 member 在 `Sorted Set` 中的排名，`ZRANK` 返回按升序排序的排名，`ZREVRANK` 则返回按降序排序的排名。时间复杂度 `O(log(N))`
- `ZINCRBY`：同 `INCRBY`，对指定 `Sorted Set` 中的指定 member 的 score 进行自增，时间复杂度 `O(log(N))`

#### 慎用的 `Sorted Set` 相关命令：

- `ZRANGE`/`ZREVRANGE`：返回指定 `Sorted Set` 中指定排名范围内的所有 member，`ZRANGE` 为按 score 升序排序，`ZREVRANGE` 为按 score 降序排序，时间复杂度 `O(log(N)+M)`，M 为本次返回的 member 数
- `ZRANGEBYSCORE`/`ZREVRANGEBYSCORE`：返回指定 `Sorted Set` 中指定 score 范围内的所有 member，返回结果以升序 / 降序排序，min 和 max 可以指定为 - inf 和 + inf，代表返回所有的 member。时间复杂度 `O(log(N)+M)`
- `ZREMRANGEBYRANK`/`ZREMRANGEBYSCORE`：移除 `Sorted Set` 中指定排名范围 / 指定 score 范围内的所有 member。时间复杂度 `O(log(N)+M)`


上述几个命令，应尽量避免传递 `0 -1` 或 `-inf +inf` 这样的参数，来对 `Sorted Set `做一次性的完整遍历，
特别是在 `Sorted Set` 的尺寸不可预知的情况下。
可以通过 `ZSCAN` 命令来进行游标式的遍历（具体请见 [Redis Scan](https://redis.io/commands/scan 'redis scan') ）
或通过 `LIMIT` 参数来限制返回 member 的数量（ _适用于 `ZRANGEBYSCORE `和 `ZREVRANGEBYSCORE` 命令_ ），以实现游标式的遍历。

### Bitmap 和 HyperLogLog 类型命令

`Redis` 的这两种数据结构相较之前的并不常用，请参考官方文档 [](https://redis.io/topics/data-types-intro) 中的相关章节

`Bitmap` 在 `Redis` 中不是一种实际的数据类型，而是一种将 `String` 作为 `Bitmap` 使用的方法。
可以理解为将 `String` 转换为 bit 数组。
使用 `Bitmap` 来存储 `true`/`false` 类型的简单数据极为节省空间。

`HyperLogLogs` 是一种主要用于数量统计的数据结构，它和 `Set` 类似，维护一个不可重复的 `String` 集合，
但是 `HyperLogLogs` 并不维护具体的 member 内容，只维护 member 的个数。
也就是说，`HyperLogLogs` 只能用于计算一个集合中不重复的元素数量，所以它比 `Set` 要节省很多内存空间。

### 其他常用命令

- `EXISTS`：判断指定的 `Key` 是否存在，返回 1 代表存在，0 代表不存在，时间复杂度 `O(1)`
- `DEL`：删除指定的 `Key` 及其对应的 value，时间复杂度 `O(N)`，N 为删除的 `Key` 数量
- `EXPIRE`/`PEXPIRE`：为一个 `Key` 设置有效期，单位为秒或毫秒，时间复杂度 `O(1)`
- `TTL`/`PTTL`：返回一个 `Key` 剩余的有效时间，单位为秒或毫秒，时间复杂度 `O(1)`
- `RENAME/RENAMENX`：将 `Key` 重命名为 newkey。使用 RENAME 时，如果 newkey 已经存在，其值会被覆盖；使用 `RENAMENX` 时，如果 newkey 已经存在，则不会进行任何操作，时间复杂度 `O(1)`
- `TYPE`：返回指定 key 的类型，string, list, set, zset, hash。时间复杂度 `O(1)`
- `CONFIG GET`：获得 `Redis` 某配置项的当前值，可以使用 * 通配符，时间复杂度 `O(1)`
- `CONFIG SET`：为 `Redis` 某个配置项设置新值，时间复杂度 `O(1)`
- `CONFIG REWRITE`：让 `Redis` 重新加载 `redis.conf` 中的配置
