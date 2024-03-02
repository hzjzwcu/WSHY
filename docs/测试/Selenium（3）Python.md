# Selenium（3）Python

## 一、安装 python

- 访问 [官网](https://www.python.org/downloads/windows/ ) 下载安装包，本例为 [python-3.8.10-amd64.exe](https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe)

- 双击安装包，在弹出窗口中勾选 `Add Python 3.8 to PATH`

    > `<python_path>` 指代 python 的安装路径
    >
    > 如果忘记勾选则需要手动添加环境变量 `<python_path>` 和 `<python_path>\Scripts`

- 点击 `Customize installation` => `Next` => `Next`

- 更改自定义安装目录，点击 `Install` 开始安装

- 安装完成，点击 `Disable path length limit` 禁用系统的 **Path长度自动限制**，能给我们避免很多的麻烦

## 二、环境搭建

- （可选）`pip` 使用国内网络安装较慢，若多次安装超时建议更换安装源，操作如下

    - 输入 `pip -v config list`查询配置文件地址，不存在的话就自己新建

    - 在配置文件中加入以下内容

        ```ini
        [global]
        index-url = http://mirrors.aliyun.com/pypi/simple/
        [install]
        trusted-host=mirrors.aliyun.com
        ```

- （可选。只是为了避免安装时的警告信息）**pip**：`python -m pip install --upgrade pip`

- **selenium**：`pip install --upgrade selenium`

- 编辑器：[pycharm](https://www.jetbrains.com/pycharm/download/#section=windows)

## 三、浏览器驱动程序

- 以 chrome 浏览器为例，前往设置页 `chrome://settings/help` 查看本地浏览器版本

- 前往 [chromeDriver 官网](https://chromedriver.chromium.org/downloads)下载对应版本的驱动程序

    > windows版本**不区分32位和64位**，统一下载32位即可

- 解压后将 `chromedriver.exe` 放置在任一环境变量所在的目录即可。例如之前配置的  `<python_path>`

- cmd 中输入指令 `chromedriver` 显示版本信息则表明成功

## 四、入门操作

创建实例

```python
from selenium import webdriver
driver = webdriver.Chrome()
```

启动浏览器进行一些操作后退出

```python
try:
    driver.get('http://www.baidu.com/')
finally:
	driver.quit()
```

也可以使用 with 关键字，在执行结束时自动退出驱动程序

```python
with webdriver.Firefox() as driver:
	driver.get('http://www.baidu.com/')
```

## 五、常用API

> 更多详情可查看 [Selenium 官网文档](https://www.selenium.dev/zh-cn/documentation/)

### 浏览器操作

| 描述                   | 用法                                    | 参数说明     |
| :--------------------- | --------------------------------------- | ------------ |
| 获取网页标题           | `driver.title`                          |              |
| 获取当前 URL           | `driver.current_url`                    |              |
| 获取窗口大小           | `driver.get_window_size().get('width')` | width/height |
| 打开网站               | `driver.get('https://selenium.dev')`    |              |
| 最大化窗口             | `driver.maximize_window()`              |              |
| 窗口截图               | `driver.save_screenshot('./image.png')` |              |
| 后退                   | `driver.back()`                         |              |
| 刷新                   | `driver.refresh()`                      |              |
| 切换iframe             | `driver.switch_to.frame(iframe_ele)`    | ele/id/name  |
| 离开iframe             | `driver.switch_to.default_content()`    |              |
| 获取当前窗口句柄       | `driver.current_window_handle`          |              |
| 切换窗口句柄           | `driver.switch_to.window(handle)`       |              |
| 打开新标签页并切换tab  | `driver.switch_to.new_window('tab')`    |              |
| 打开新标签页并切换窗口 | `driver.switch_to.new_window('window')` |              |
| 关闭当前标签页         | `driver.close()`                        |              |
| 关闭所有标签页         | `driver.quit()`                         |              |
| 运行JS代码             | `driver.execute_script('...')`          |              |

### 定位元素

| 描述         | 用法                                               | 备注 |
| ------------ | -------------------------------------------------- | ---- |
| class属性    | `driver.find_element(By.CLASS_NAME, "kw")`         |      |
| id 属性      | `driver.find_element(By.ID, 'kw')`                 |      |
| CSS 选择器   | `driver.find_element(By.CSS_SELECTOR, 'kw')`       |      |
| 文本完全匹配 | `driver.find_element(By.LINK_TEXT, 'val')`         |      |
| 文本模糊匹配 | `driver.find_element(By.PARTIAL_LINK_TEXT, 'val')` |      |
| xpath表达式  | `driver.find_element(By.XPATH, '//div')`           |      |
| 匹配多个结果 | `driver.find_elements(...)`                        |      |
| 焦点元素     | `driver.switch_to.active_element`                  |      |

### 元素操作

> 点击和输入等操作会将元素自动滚动到可见范围

| 描述               | 用法                                                 | 备注     |
| ------------------ | ---------------------------------------------------- | -------- |
| 获取元素CSS值      | `ele.value_of_css_property('color')`                 |          |
| 获取元素文本       | `ele.text`                                           |          |
| 元素截图           | `ele.screenshot('./image.png')`                      |          |
| 点击               | `ele.click()`                                        | 会被遮挡 |
| JS点击             | `driver.execute_script('arguments[0].click()', ele)` | 无视遮挡 |
| 输入按键（文本框） | `ele.send_keys('web' + Keys.ENTER)`                  | 无视遮挡 |
| 清除（文本框）     | `ele.clear()`                                        | 无视遮挡 |

### 等待

**强制等待**：使用 **python** 自带的库即可实现

```python
import time
time.sleep(1)
```

**隐式等待**：一旦设置，会在全局生效，在查找元素时会一定时间内重试，直到超时

```python
driver.implicitly_wait(10)
```

**显示等待**：一定时间内持续重试，直到满足通过条件或超时，需要在 `util` 或者 `util_not` 中传入校验函数（建议使用EC模块断言，在断言中会说明），校验函数的第一个参数是 `driver` 本身

```python
from selenium.webdriver.support.ui import WebDriverWait

WebDriverWait wait =new WebDriverWait(driver, 20)
el = WebDriverWait(driver, 10).until(lambda d: d.find_element_by_tag_name("p"))
assert el.text == "Hello from JavaScript!"
```

> *警告:* **不要混合使用隐式和显式等待**。这样做会导致不可预测的等待时间。例如，将隐式等待设置为10秒，将显式等待设置为15秒，可能会导致在20秒后发生超时。

### 断言

**python断言**

```python
assert ele.text == "Hello from JavaScript!"
```

**元素断言**

| 描述         | 用法                 | 备注         |
| ------------ | -------------------- | ------------ |
| 元素是否可见 | `ele.is_displayed()` |              |
| 元素是否选中 | `ele.is_selected()`  | 例如checkbox |

**EC模块断言**

使用EC模块的断言方法会生成一个函数，该函数可以传入 `util` 中，也可以直接调用时（需要传入 `driver`） ，完整 API 请查看 [官网文档](https://www.selenium.dev/selenium/docs/api/py/webdriver_support/selenium.webdriver.support.expected_conditions.html?highlight=expected)，基础用法如下

```python
from selenium.webdriver.support import expected_conditions as EC
fun = EC.title_contains('vite')
result = fun(driver)
```

| 描述           | 用法                                            | 备注                    |
| -------------- | ----------------------------------------------- | ----------------------- |
| 标题包含某内容 | `title_contains('title')`                       |                         |
| URL包含某内容  | `url_contains('url')`                           |                         |
| 元素是否选中   | `element_located_to_be_selected((By.ID, 'b1'))` |                         |
| 元素是否可点   | `element_to_be_clickable((By.ID, 'b1'))`        | 可识别CSS隐藏和disabled |
| 元素是否可见   | `visibility_of_element_located((By.ID, 'b1'))`  | 无法判断遮罩            |

## 六、unittest框架































