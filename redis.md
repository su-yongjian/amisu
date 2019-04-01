为何session适用于redis？
  因为session访问频率频繁，对性能要求高
  session可以不考虑状态断电丢失问题（内存硬伤）
  session存储数据量小
  为何网站数据不适用redis
- 操作频率不高
- 断电不能丢失，必须保留
- 数据量大，内存成本高

Redis 是完全开源免费的，遵守BSD协议，是一个高性能的key-value数据库。

Redis 与其他 key - value 缓存产品有以下三个特点：

  Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
  Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
  Redis支持数据的备份，即master-slave模式的数据备份。
Redis 优势
  性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。
  丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
  原子 – Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
  丰富的特性 – Redis还支持 publish/subscribe, 通知, key 过期等等特性。


redis安装：
  下载地址：https://github.com/MSOpenTech/redis/releases。下载解压即可，我这里安装的是64位 3.2.100版本
  配置系统环境变量：D:\Redis-x64-3.2.100;
  启动命令：cmd  -->  redis-server

  默认端口是6379

  新开cmd窗口执行：redis-cli.exe -h 127.0.0.1 -p 6379
  redis存储数据都是以键值对的方式存储：
  存：set key value 如：set username zhangsan  输出ok表示设置成功
  取：get key       如：get username  输出“zhangsan”
  删:del key        如：del username  输出integer 1 表示删除成功