# Selenium+RF（1）robotframework

## 一、安装 python

- 访问 [官网](https://www.python.org/downloads/windows/ ) 下载安装包，本例为 [python-3.8.10-amd64.exe](https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe)

- 双击安装包，在弹出窗口中勾选 `Add Python 3.8 to PATH`

  > `<python_path>` 指代 python 的安装路径
  >
  > 如果忘记勾选则需要手动添加环境变量 `<python_path>` 和 `<python_path>\Scripts`

- 点击 `Customize installation` => `Next` => `Next`

- 更改自定义安装目录，点击 `Install` 开始安装

- 安装完成，点击 `Disable path length limit` 禁用系统的 **Path长度自动限制**，能给我们避免很多的麻烦

## 二、安装 RF 和依赖

### 2.1 安装依赖

- `pip` 指令使用国内网络安装较慢，若多次安装超时**不建议使用代理**，而是应该更换安装源，操作如下

    - 输入 `pip -v config list`查询配置文件地址，不存在的话就自己新建

    - 在配置文件中加入以下内容

        ```ini
        [global]
        index-url = http://mirrors.aliyun.com/pypi/simple/
        [install]
        trusted-host=mirrors.aliyun.com
        ```

- **pip**：`python -m pip install --upgrade pip`（可选。只是为了避免安装时的警告信息）

- **robotframework**：`pip install robotframework==4.1.3`

- **wxpython**：`pip install wxpython==4.0.7post2`

- **psutil**：`pip install psutil==5.9.0`

- **ride**：`pip install --pre --upgrade robotframework-ride==2.0b1`

- **selenium**：`pip install --upgrade robotframework-seleniumlibrary`

## 三、准备浏览器驱动程序

- 以 chrome 浏览器为例，前往设置页 `chrome://settings/help` 查看本地浏览器版本

- 前往 [chromeDriver 官网](https://chromedriver.chromium.org/downloads)下载对应版本的驱动程序

  > windows版本**不区分32位和64位**，统一下载32位即可

- 解压后将 `chromedriver.exe` 放置在任一环境变量所在的目录即可。例如之前配置的  `<python_path>`

- cmd 中输入指令 `chromedriver` 显示版本信息则表明成功

## 四、使用 RIDE 运行用例

- **RIDE** 安装后桌面会出现一个快捷方式，双击打开界面

  > 也可使用命令行启动 `python <python_path>\Scripts\ride.py `

- `File` => `Open Directory` 导入项目文件夹

- 勾选需要运行的用例

- 点击运行按钮

- 等待运行完成后点击 `Log` 即可查看运行日志

## 五、用法

### 常用方法

> 大多数关键字**区分大小写**，不要随意修改

- **遍历循环 `FOR`**

    ```markdown
        FOR    ${i}    IN RANGE    600
            Log    ${i}
            Exit For Loop If    ${i}==10
        END
    ```

- **条件判断 `Run Keyword If`**

    ```markdown
        Run Keyword If    ${flag}==1    Run Keywords    Log    Flag为1
        ...    AND    Log    Flag为1
        ...    ELSE IF    ${flag}==2    Log    Flag为2
        ...    ELSE    Log    Flag为其他值
    ```

### 框架自带关键字

> 查看更多可前往 [SeleniumLibrary 官网文档](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html)

#### 1 无返回值关键字

- 浏览器操作

    | 关键字用途               | 示例                                | 备注           |
    | ------------------------ | ----------------------------------- | -------------- |
    | 打开浏览器并前往指定页面 | `Open Browser  ${url}  chrome`      | 常用于第一步   |
    | 最大化窗口               | `Maximize Browser Window`           |                |
    | 关闭当前标签页           | `Close Window`                      |                |
    | 关闭浏览器               | `Close All Browsers`                | 常用于最后一步 |
    | 获取所有窗口句柄         | `${handles}  Get Window Handles`    |                |
    | 切换句柄                 | `Switch Window  ${handles[${num}]}` | num从0开始     |
    | 切换 iframe              | `Select Frame    //iframe`          |                |
    | 截图                     | `Capture Page Screenshot  EMBED`    |                |


| 关键字用途               | 示例                                | 备注           |
| ------------------------ | ----------------------------------- | -------------- |
| 打开浏览器并前往指定页面 | `Open Browser  ${url}  chrome`      | 常用于第一步   |
| 最大化窗口               | `Maximize Browser Window`           |                |
| 刷新页面                 | `Reload Page`                       |                |
| 关闭当前标签页           | `Close Window`                      |                |
| 关闭浏览器               | `Close All Browsers`                | 常用于最后一步 |
| 获取所有窗口句柄         | `${handles}  Get Window Handles`    |                |
| 切换句柄                 | `Switch Window  ${handles[${num}]}` | num从0开始     |
| 切换 iframe              | `Select Frame    //iframe`          |                |
| 截图                     | `Capture Page Screenshot  EMBED`    |                |

- 元素操作

    | 关键字用途     | 示例                                       | 备注                       |
    | -------------- | ------------------------------------------ | -------------------------- |
    | 聚焦某元素     | `Set Focus To Element   ${ele}`            |                            |
    | 更改输入框的值 | `Input Text    ${input}    ${txt}`         | 会覆盖原内容               |
    | 单击某元素     | `Click Element  ${btn}`                    |                            |
    | 双击某元素     | `Double Click Element  ${btn}`             |                            |
    | 本地文件上传   | `Choose File  //input  ${CURDIR}\\img.jpg` | `${CURDIR}`为用例相对路径  |
    | 抹掉某元素     | `Cover Element  ${ele}`                    | 使用蓝色填充，不影响原布局 |

- 等待操作

    | 关键字用途             | 示例                                                      | 备注   |
    | ---------------------- | --------------------------------------------------------- | ------ |
    | 等待页面(不)包含某元素 | `Wait Until Page (Does Not) Contains Element  ${ele}  30` | 单位秒 |
    | 等待某元素可见         | `Wait Until Element Is Visible    ${ele}    30`           |        |
    | 等待某元素可用         | `Wait Until Element Is Enabled    ${ele}    30`           |        |
    | 等待指定时间           | `Sleep    1`                                              | 单位秒 |

- 其他操作

    | 关键字用途         | 示例                                               | 备注                                                         |
    | ------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
    | 运行关键字失败重试 | `Wait Until Keyword Succeeds    3x    5s    login` | login为运行的关键字                                          |
    | 模拟键盘输入       | `Press Keys  None  ARROW_DOWN+CTRL`                | [更多按键代码](https://www.selenium.dev/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html) |
    | 定义变量           | `${a}  ${b}  Set Variable  1  2`                   |                                                              |
    | 运行JS代码         | `Execute Javascript    window.location.reload()`   | 比如刷新页面                                                 |

#### 2 有返回值关键字

| 关键字用途    | 示例                                         | 备注 |
| ------------- | -------------------------------------------- | ---- |
| 元素属性变量  | `${a}  Get Element Attribute  ${ele}  class` |      |
| If 判断返回值 | `${a}  Run Keyword If  ${b}>0  ...`          |      |
| 保存返回值    | `${a}  Run Keyword And Return Status    ...` |      |
| 浏览器宽高    | `${w}  ${h}  Get Window Size`                |      |
| 元素内部文本  | `${a}  Get Text  ${ele}`                     |      |
| 选择器匹配数  | `${a}  Get Element Count  ${ele}`            |      |

#### 3 常用断言

- 文本断言

| 关键字用途             | 示例                               | 备注                 |
| ---------------------- | ---------------------------------- | -------------------- |
| 前者是否（不）包含后者 | `Should (Not) Contain  ${a}  ${b}` |                      |
| 比较文字（不）相等     | `Should (Not) Be Equal  ${a}  abc` | 文本无需引号         |
| 页面中（不）存在某文本 | `Page Should (Not) Contain  abc`   | 可视范围外也可检测到 |

- 数字断言

| 关键字用途         | 示例                                        | 备注 |
| ------------------ | ------------------------------------------- | ---- |
| 比较数字（不）相等 | `Should (Not) Be Equal  ${${a}+1}  ${${b}}` |      |

- 元素断言

| 关键字用途             | 示例                                                   | 备注                                 |
| ---------------------- | ------------------------------------------------------ | ------------------------------------ |
| 页面中（不）存在某元素 | `Page Should (Not) Contain Element  ${ele}`            | 不检测可视范围、display、遮罩层      |
| 复选项（不）应该被选中 | `Checkbox Should (Not) Be Selected  ${ele}`            |                                      |
| 元素属性值应该是       | `Element Attribute Value Should Be  ${ele}  value  v1` |                                      |
| 元素应当禁（可）用     | `Element Should Be Disabled(Enabled)    ${ele}`        |                                      |
| 元素应当聚焦           | `Element Should Be Focused    ${ele}`                  |                                      |
| 元素应当（不）可见     | `Element Should Be Visible    ${ele}`                  | 不检测可视范围、遮罩层，检测 display |
| 元素文本模糊匹配       | `Element Should (Not) Contain  ${ele}  txt`            |                                      |
| 元素文本精准匹配       | `Element Text Should (Not) Be  ${ele}  txt`            |                                      |
|                        |                                                        |                                      |

### 常用自定义关键字

#### 1 更改依赖项

- **右键点击元素 `Right Click Element`**

    在`<python_path>\Lib\site-packages\SeleniumLibrary\keywords`的`element.py`中加入方法，保存后**重启RF**直接调用`Right Click Element`关键字就可以，代码如下所示

    ```python
    @keyword(name='Right Click Element')
    def right_click_element(self,locator):
        element = self.find_element(locator)
        action = ActionChains(self.driver)
        action.context_click(element).perform()
    ```


#### 2 项目配置

- **失败时截图**

    在引入资源库时添加参数

    ```
    *** Settings ***
    Library  SeleniumLibrary  timeout=60  implicit_wait=1.5  run_on_failure=Capture Page Screenshot
    ```

    

