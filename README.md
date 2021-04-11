

# 软件介绍

孩提时代的你一定被[格林童话](https://fairytalez.com/little-snow-white/)中Happy小矮人的故事所吸引，也定曾向往过在神秘的世界里探索、发现属于自己的宝藏，虽然现实没有童话，但技术可以改变世界，“嗨皮矿工”应运而生，它生动有趣、操作简单，又具有令人满意的效率。现在使用嗨皮矿工，一起开工大吉！

# 软件特点

* 省心：
    + 绿色共享、安全可靠，无需担心病毒、系统稳定性、第三方插件、信息泄露等问题；
    + 操作极简，上手容易；
    + 软件界面代码开源。

* 高效：
    + 自研算法内核，掌握核心技术，提供nvidia最新cuda11.1版本，运行高效；
    + 在网络连接不间断的情况下, 算力波动极小，理论上本地算力与24小时平均算力一致；
    + 更多内容请参考[算力优化手册](https://happyminer.cn/#如何在嗨皮矿工中达到最高算力)。

* 时尚：
    + 专业设计师操刀，界面生动，简洁美观；
    + 个性十足，可根据个人喜好DIY界面。


# 下载地址


## windows DIY版

|版本号|  nvidia cuda 11.1  |   nvidia cuda 10.2(适合旧版驱动，不支持30系显卡) |    amd |   发布时间 |
|:--|:--|:--|:--|:--|
|v1.0|[百度云下载 提取码: g48y](https://pan.baidu.com/s/1Wswd5PA2bWQ5i2cp9vYMXw)  |[百度云下载 提取码: 29cw](https://pan.baidu.com/s/1SHn3qQYG36ZwP-RwiEjaVg)|    暂不支持    | 2021年4月11号 |

## windows版

|版本号|  nvidia cuda 11.1  |   nvidia cuda 10.2(适合旧版驱动，不支持30系显卡) |    amd |   发布时间 |
|:--|:--|:--|:--|:--|
|v1.0|[百度云下载 提取码: k93k](https://pan.baidu.com/s/1TPPSwavCe5c0GFsJEtznIA) |[百度云下载 提取码: 7dek](https://pan.baidu.com/s/1M-lxGcoxvmVZGJCMxuNv_w) |    暂不支持    | 2021年4月8号 |

## linux版

|版本号|  nvidia cuda 11.1  |   nvidia cuda 10.2(适合旧版驱动，不支持30系显卡) |    amd |   发布时间 |
|:--|:--|:--|:--|:--|
|v1.0|[百度云下载 提取码: vjd2](https://pan.baidu.com/s/1RLl_FSVjaOAgEs8lsnleCg) |[百度云下载 提取码: edqj](https://pan.baidu.com/s/1Sy1COURn9bORVryy0soNRg) |    暂不支持    | 2021年4月8号  |


## github网址

[github网址](https://github.com/7dwarfs/happyminer)

## 最近更新
### happyminer v1.0  2021年4月8号
happyminer windows版正式发布

### happyminer v0.2  2021年3月20号
修复happyminer linux内核断网重连算力下降问题

### happyminer v0.1  2021年3月16号
happyminer linux内测版内核完成


# 优化目标

- [ ] 加入可选的新皮肤
- [ ] 加入超频设置
- [ ] 异常状态提示
- [ ] 可设置为开机启动
- [ ] 连续运作24小时后自动掉线告警
- [ ] 在线查看gpu温度、风扇转速、算力、重启次数等信息
- [ ] 算法进一步优化

# 版权声明

* 本技术仅限于技术交流及个人非商业目的使用，版权所有，未经授权不得擅自用于其他用途

# 嗨皮矿工速查手册

## 操作指南

* windows版下载完成后，使用winrar解压软件解压缩，打开目录中的Happyminer.exe执行
* linux版下载完成后，修改start_happyminer.sh中的钱包和矿池信息即可使用
* 如果快捷键**ctrl+shift+x**未被其它应用占用，则使用快捷键**ctrl+shift+x**可以**一键关闭程序**

## 算力优化手册

* **稳定、低延时的网络运行环境**将极大提高软件的工作效率
* 1080和1080ti系列显卡运作时，同时打开**OhGodAnETHlargementPill-r2.exe**将提速
    + [OhGodAnETHlargementPill-r2.exe百度云下载 提取码: 1363](https://pan.baidu.com/s/1CCRxBsp3zTVC1cBuTKBiLA) 
* 若要超频，可与[微星小飞机](https://cn.msi.com/Landing/afterburner)配合使用
* 请在软件开始挖矿后，最小化软件，将能**提升更多的算力**

## 异常自助指南
* **有5张和以上显卡, 发现最多只能显示4个**
   + 需要开启主板BIOS Above 4G Decoding，或Miner mode
   + windows需要设置较大虚似内存，建议至少(6G X 显卡数量)
* 嗨皮矿工一直显示重启中
   + 检查矿池用户名是否配置正确
   + 检查网络是否断开
   + 下载最新nvidia驱动，重启电脑后，使用嗨皮矿工cuda11.1版本
* 某张显卡开始有算力，执行一段时间后算力变0
   + 降低超频参数
* 30系显卡无算力
   + 需下载cuda11.1版本的嗨皮矿工
