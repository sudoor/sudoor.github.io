---
title: Linux 的定时任务
date: 2016-03-17 09:28:09
categories:
    - Linux
tags:
    - crontab
keywords: Linux crontab
description: Linux 提供了crontab的第十任务服务，我们可以使用它完成一些重复的定时任务，比如日志切割等
---
### 定时任务命令：
&emsp;&emsp;定时任务服务提供crontab命令来设定任务
```bash
crontab -e // 编辑某个用户的cron服务
crontab -l // 列出某个用户cron服务的详细内容
crontab -r // 删除某个用户的cron服务
```
__定时任务crontab格式：__
```
分      小时     日     月     星期     命令
*       *       *      *       *
0-59  0-23      1-31  1-12   0-6      command
```

_注：“\*”代表取值范围内的数字，“/”代表每，例如每分钟_
定时任务crontab例子：

\*/1 \* \* \* \* /bin/bash /data/cron.sh // 每分钟执行一次cron.php
50 7 \* \* \* /bin/bash /data/cron.sh // 每天7：50执行一次cron.php
