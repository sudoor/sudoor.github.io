---
title: 在阿里云服务器内网下的NodeJS的代理设置
comments: true
date: 2015-06-14 19:35:52
updated: 2015-12-22 12:32:02
categories:
    - 阿里
    - ECS
    - NodeJs
tags:
    - 阿里
    - ECS
    - NodeJs
keywords:
    - 阿里
    - ECS
    - NodeJs
description:
    ECS的内网机器是无法连接外网，所以考虑使用外网机器作为代理，采用squid做正向代理缓存服务
---

ECS的内网机器是无法连接外网，所以考虑使用外网机器作为代理
采用 __squid__ 做正向代理缓存服务

首先确认内网ECS的网段为:`10.0.0.0/8`
然后检查squid是否安装

```shell
rpm -qa|grep squid
```

安装squid

```shell  
yum -y install squid
```
配置squid

```
http_port  3128   //设置监听的IP与端口号
cache_mem  64 MB  //额外提供给squid使用的内存
maximum_object_size  4 MB  //设置squid磁盘缓存最大文件
cache_dir ufs /var/spool/squid 100 16 256     //定义squid的cache存放路径 、cache目录容量（单位M）、一级缓存目录数量、二级缓存目录数量
access_log /var/log/squid/access.log          //log文件存放路径和日志
acl localnet src 10.0.0.0/8                   //定义本地网段
http_access allow localnet                  //允许本地网段使用
http_access deny all                       //拒绝所有
visible_hostname squid.vpn.dev      //主机名
cache_mgr xxx@xxx.com
```
初始化

```shell
squid  squid –z
```
用root权限运行

```shell
sudo service 
squid start（/etc/init.d/squid start）
```
添加端口转发（在路由前将3128端口转发至80）

```shell
iptables -t nat -I PREROUTING -i eth0 -s 10.0.0.0/8 -p tcp --dport 80 -j REDIRECT --to-port 3128
```
查看配置

```shell
iptables -t nat -vnL
```
在内网的机器上安装nodeJS（tar包）

配置nodeJS的代理   
 
```shell
npm config set proxy=http://squid服务地址:squid监听端口
```
至此，nodeJs就可以访问外网安装modules了
