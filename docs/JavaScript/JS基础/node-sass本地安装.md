# node-sass 本地安装

## 查看版本

1. 运行 `node -v` 查看 node 版本
2. 查找对应版本的 node-sass 版本
   |node 版本|node-sass 版本|
   |:---|:---|
   |14.x| 4.14.x|
   |13.x| 4.13.x|
   |12.x| 4.12.x|
   |11.x| 4.10.x|
   |10.x| 4.9.x|
3. 运行以下命令找到匹配版本：
   
   > node -p "[process.platform,process.arch,process.versions.modules].join('-')"

### 下载文件

前往 [GIT 发布页](https://github.com/sass/node-sass/releases) 下载对应的 `.node` 文件

### 替换本地缓存文件

1. 查找本地缓存目录 `npm config get cache`

2. 找到 `node-sass/$version` 文件夹，没有就自己新建
   >
   >\$version 指的是 node-sass 的版本，例如 4.14.1
   
3. 将下载好的 `.node` 文件放入文件夹中

4. `npm install node-sass@4.14.1` 安装
