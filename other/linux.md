##安装配置jdk
###下载
下载压缩包，如我的是`jdk-8u92-linux-x64.tar.gz`，解压到指定位置
```
tar -zxvf jdk-8u92-linux-x64.tar.gz
```
###配置环境变量
```
export JAVA_HOME=/usr/software/Java/jdk1.8.0_92/ 
export PATH=$JAVA_HOME/bin:$PATH 
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
```


##使用nvm安装和管理node
###下载NVM并配置环境变量
>curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

或者

>wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

默认的安装下载位置为：`~/.nvm`指定下载的位置可以用：

>curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | NVM_DIR="/usr/software/nvm" bash

配置环境变量[~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc]：

```
export NVM_DIR="/usr/software/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

**注意：**
-环境安装时会自动写入，若未自动写入请手动添加
-也可使用`git clone https://github.com/creationix/nvm.git`将文件下载到本地然后配置环境变量

###使用NVM下载node
####更改node下载地址
NVM默认的node下载地址为 `http://nodejs.org/dist/`，被墙了，配置国内node下载位置：
>NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node

这个地址可以打开你可以在浏览器中查看有哪些可用版本。若不想每次都输入`NVM_NODEJS_ORG_MIRROR`变量，可加入到 .bashrc 文件中:
```
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
```
####安装node
```
nvm install v4.2.6
```
查看当前有哪些node版本可用
```
nvm ls
```
选择使用的node版本
```
nvm use v4.2.6
```

###node的加速
####npm自身升级
查看npm版本
```
npm -v
```
升级到指定版本
```
npm -g install npm@2.9.1
```
升级到最新版本
```
npm -g install npm
```
####使用cnpm
安装
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
在使用过程中使用`cnpm`代替`npm`命令即可,`cnpm`支持`npm`除了`publish`之外的所有命令

###在windows中使用nvmw
windows中有`nvmw`作为`nvm`的替代方案
下载：
```
git clone https://github.com/hakobera/nvmw.git
```

配置环境变量后使用`nvmw`代替`nvm`即可。

设置node下载地址
```
set "NVMW_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node"
```
另一个解决方案：
>https://github.com/coreybutler/nvm-windows

##使用Nexus配置maven私服

