#git的使用笔记

[TOC]

## 初始配置

### 设置姓名和邮箱
```
git config --global user.name "UserName" 
git config --global user.email "UserName@gmail.com" 
```
**~/.gitconfig将被添加如下信息：**
```
[user] 
    name = UserName
    email = UserName@gmail.com
```

### 提高命令输出的可读性
```
git config --global color.ui auto
```

**注：**配置信息会写入到"~/.gitconfig"文件中

##使用前的准备工作

### 创建GitHub账户
在GitHub网站中创建用户并完善个人信息

### 设置SSH Key
**说明**：在本地生成SSH Key和github网站进行通信
运行以下的命令在本地生成SSH Key
```
ssh-keygen -t rsa -C "UserName@gmail.com"
```
**注：**
1. 这个过程中使用的"UserName@gmail.com"邮箱应该是你在注册github时使用的邮箱，林外在生成key的过程中要输入一次密码，改密码在又以后的通讯中会用到。
2. 在"~/.ssh/"目录下会生成一个id_rsa(私钥)，id_rsa.pub(公钥)。当然，这需要在你在生成密钥的过程中未指定生成密钥的具体位置。

### 添加公钥到你的github账户中

使用下面的命令查看id_rsa.pub中的信息(用文本编辑打开亦可)
```
cat ~/.ssh/id_rsa.pub
```
将id_rsa.pub中的内容添加到github账户中

### 用私人密钥完成与GitHub的认证和通讯
```
ssh -T git@github.com
```

### 将github仓库clone下来并推送本地仓库

使用下面的命令clone
```
git clone git@github.com:Meddkim/notes.git
```

使用下面的命令将本地的仓库的文件推送至github
```
git push
```

### 克隆已有的项目
```
git clone git@github.com:MeddKim/notes.git
```
### 对该github项目进行管理
#### 查看git项目状态
```
git status
```
#### 提交新内容
##### 加入暂存区
```
git add hello.txt
```
##### 提交
```
git commit -m "注释"
```
**注：**若是不添加注释直接使用git commit，那么就会启动注释编辑器，可在其中编辑本次提交的注释，一般来说格式如下：
```
第一行：用一行文字简述提交的内容更改
第二行：空行
第三行：记述更改的原因和详细内容等一些详细信息
```
若是将提交信息留空并直接关闭编辑器，`提交就会被终止`
##### 查看提交日志
```
git log
```
**只显示指定文件的日志**
```
git log 
```
**显示指定文件改动的内容**
```
git log -p readme.txt
```
4.推送
```
git push
```
### 比较
### 分支
#### 显示分支一览表
```
git branch
```
### 创建并切换到分支
```
git checkout -b feature-A
```
也可连续执行下面的命令
```
git branch feature-A
git checkout feature-A
```
切回到原来的分支
```
git checkout master
```
或者使用切回上一个分支
```
git checkout -
```
### 合并分支到master上
首先切回到master上
```
git checkout master
```
合并分支
```
git merge --no-off feature-A
```
