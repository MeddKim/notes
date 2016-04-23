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
- 查看git项目状态
```
git status
```
- 提交新内容
1.加入暂存区
```
git add hello.txt
```
2.提交
```
git commit -m "注释"
```
