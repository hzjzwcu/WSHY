# ReactNative安卓环境搭建

## 一、安装依赖

参考[**RN官网文档**](https://reactnative.cn/docs/environment-setup)，安装以下几项：

- `Node`
- `JDK`
- `Android Studio`
  - `Android SDK` ：以`Android 13 (Tiramisu)`为例
    - `Intel x86 Atom_64 System Image`
    - `Android SDK Platform 33`
- 配置以上工具的环境变量

## 二、新建项目

```shell
npx react-native@latest init AwesomeProject
```

## 三、设置国内镜像源

`android/gradle/wrapper/gradle-wrapper.properties`

```
# 替换前
distributionUrl=https\://services.gradle.org/distributions/gradle-8.3-all.zip

# 替换后
distributionUrl=https\://mirrors.aliyun.com/macports/distfiles/gradle/gradle-8.3-all.zip
```

> 如果之前没下载过gradle，可以先在这里配置，**不要替换后面的文件名**，也可以下载好以后将这里的链接换为本地路径

`android/build.gradle`，此处设置参考[阿里云仓库服务](https://developer.aliyun.com/mvn/guide)

```
buildscript {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/central' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        maven { url 'https://maven.aliyun.com/repository/apache-snapshots' }
        mavenLocal()
        google()
        jcenter()
        mavenCentral()
    }
}

allprojects {
    repositories {
        # 同上配置
    }
}

apply plugin: "com.facebook.react.rootproject"
```

`gradle-plugin`

在`android/settings.gradle`中查找`gradle-plugin`的引入路径，然后修改该路径下的`build.gradle.kts`与`settings.gradle.kts`，配置上文中的`maven`镜像源，地址同上。但是要把`url`改成`setUrl`

```
repositories {
    maven { setUrl("https://maven.aliyun.com/repository/central") }
    maven { setUrl("https://maven.aliyun.com/repository/public") }
    maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin") }
    maven { setUrl("https://maven.aliyun.com/repository/apache-snapshots") }
    mavenCentral()
    google()
    gradlePluginPortal()
}
```

使用`android studio`（推荐）打开`android`目录，或者使用指令`./gradlew dependencies`安装相关的包，