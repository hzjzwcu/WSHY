# Cordova Android（1）项目初始化

> **cordova** 用于跨平台项目方案，web开发只需要一个 Nodejs 环境，但是跨平台涉及到很多依赖项，在此记录一下安装注意事项，详情可见[平台指南](https://cordova.apache.org/docs/en/10.x/guide/platforms/android/)

### 1 JDK

- 下载，这里使用华为云的[镜像](https://repo.huaweicloud.com/java/jdk/)
- 配置**环境变量**，安装时候可选直接配置好，或者自定义
    - 以  `C:\jdk1.8` 为例
    - 新增环境变量 `JAVA_HOME`，值是  `C:\jdk1.8`
    - 新增环境变量 `CLASSPATH` ，值是 `.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`
    - 在 `Path` 中添加两条记录
        - `%JAVA_HOME%\bin`
        - `%JAVA_HOME%\jre\bin`
- 在 cmd 下键入 `javac` 有输出则说明安装完成

### 2 Android Studio（以下简称AS）

- [官网下载](https://developer.android.google.cn/studio/)并安装，当前版本为 2020.3.1
- `settings` 中找到 `Android SDK` ，下载好需要的 SDK 版本
- 将 **AS** 的  `Android SDK` 目录配置到**环境变量**中
- 在 cmd 下键入 `abd` 有输出则说明安装完成

### 3 Gradle工具

- [下载](https://gradle.org/releases/)安装该插件用于构建 Android，应根据实际项目中的 `build.gradle` 描述的 gradle 版本号安装
- 本例 **`Gradle`** 版本为 7.1.1 ，AS 的 **`Gradle 插件`**版本为 4.2.2，**这是两个不同的工具**，版本号不一致
- 将 `bin` 目录配置到 path 环境变量中
- 在 cmd 下键入 `gradle -v` 有输出则说明安装完成

### 4 创建项目

- 全局安装 cordova 指令  `npm i -g cordova` （当前版本为 10.1.1）

- 使用 `cordova create hello com.example.hello HelloWorld` 指令生成一个新项目

    - **`hello`** - 项目目录名，必填
    - **`com.example.hello`** - App ID ，默认是 **io.cordova.hellocordova**
    - **`HelloWorld`** - 应用程序的项目名，默认是 **HelloCordova**

- 添加 **android** 平台

    - 运行 `cordova platform add android --save` 会生成 AS 项目在 `platforms/android` 中
    - 打包构建 `cordova build android`

- 错误提示

    - 此时可能会由于使用了废弃语法而报错，可以试着往下**降低Gradle版本**或者**注释掉提示的代码**即可

    - 下载速度非常慢，大概率是**网络被墙**，有以下两种办法

        - 开 **VPN**

        - 在 `android/repositories.gradle` 里添加国内镜像，这里以[阿里镜像](https://developer.aliyun.com/mvn/guide)为例

            ```js
            ext.repos = {
                maven { url 'https://maven.aliyun.com/repository/central' }
                maven { url 'https://maven.aliyun.com/repository/public' }
                maven { url 'https://maven.aliyun.com/repository/google' }
                maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
                maven { url 'https://maven.aliyun.com/repository/spring/'}
                google()
                mavenCentral()
            }
            ```

- 出现 `BUILD SUCCESSFUL` 则说明构建成功

- 前往 `android/app/build/outputs/apk/debug` 目录下找到 apk 安装包，下载到手机并安装

### 5 集成到 Vue 项目中

- 创建一个 vue 项目

- 将两个项目的 `package.json`  合并，**以 vue 项目的配置优先**，附上一个合并方法

    ```js
    // 合并两个对象，冲突属性以 main 为准，最后返回 main
    function mergeJSON(minor, main) {
        for (let key in minor) {
            if (main[key] === undefined) {
                main[key] = minor[key];
                continue;
            }
            const isJson = typeof minor[key] == 'object' && minor[key].constructor == Object;
            isJson && arguments.callee(minor[key], main[key]);
        }
        return main;
    }
    ```

- 将其余的 cordova 项目的文件复制到 vue 项目中， 除了`package.json` 和  `package-lock.json`

- 修改 vue 项目的**输出目录**，本例使用 [vite](https://cn.vitejs.dev/) ，因此修改的是 `vite.config.js`

    ```js
    export default defineConfig({
        build: {
            outDir: 'www',
        },
    });
    ```

### 6 调试

- 在 `package.json` 中新增指令

    ```json
    "scripts": {
        "android": "vite build && cordova run android"
    }
    ```

- 使用安卓手机连接电脑

- 安装好**手机驱动**

- 打开手机 **usb调试** 功能

- 运行 `npm run android` 等待手机**自动安装** apk

- 打开 chrome 浏览器，在地址栏输入地址 `chrome://inspect/#devices` 等待手机设备信息出现

- 点击 `inspect` 按钮，即可在弹出的 **`devtools`** 窗口中调试



















