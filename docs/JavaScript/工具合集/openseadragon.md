# openseadragon代码示例

#### 准备工作

1. 前往官网[openseadragon](https://openseadragon.github.io/#examples-and-features)
2. 点击标题右侧的 zip 按钮，下载示例代码
3. 解压压缩包后，你会得到一个 `images` 文件夹和 `openseadragon` 的源码，`images`文件夹是官方案例中所需的图标
4. 如果没有现成的切图，可以去微软提供的 [切图工具网站](http://www.microsoft.com/en-us/download/details.aspx?id=24819) 下载工具 `Deep zoom Composer`
5. 安装 `npm i openseadragon -S`
#### 切图工具使用步骤

1. 打开  `Deep zoom Composer` 软件，新建一个工程，点击 `add image` 添加需要分割的大图
2. 在 Export 栏依次选择导出选项：
   1. Output type：Images
   2. Name：自定义名称
   3. Location：导出路径
   4. Export options：Export as a collection(multiple images) 不勾选下面的checkbox
   5. Image setting：默认即可
   6. 点击Export按钮
3. 打开导出的目录，找到 `dzc_output_images` 文件夹，里面的`images`文件夹是图片源，`xml`文件中含有对应的配置项

#### 基础实例 - 图片展示

- HTML

  ```html
  <div id="openseadragon1"></div>
  ```

- CSS

  ```css
  #openseadragon1{
      width: 800px;
      height: 600px;
  }
  ```

- JS

  - 初始化

    ```js
    import openseadragon from 'openseadragon';
    this.viewer = new Openseadragon({
        id: 'openseadragon1',
        prefixUrl: '/openseadragon/images/', // 图标路径，官网下载的zip包中有
    });

    // 添加回调函数
    this.viewer.addHandler('open', function() {
        console.log('图像打开成功');
    });
    ```

  - 装载tileSource，ajax请求可在这一步骤执行

    ```js
    // 自定义配置
    const tileSource = {
        Image: {
            xmlns: 'http://schemas.microsoft.com/deepzoom/2009',
            Url: '/images/image1/', // 图片存放的路径
            Overlap: '1',
            TileSize: '256',
            Format: 'jpg',
            Size: {
                Height: '4000',
                Width: '6000',
            },
        },
    };
  
    // dzi或者xml等配置文件的话只需要路径即可，图片文件夹名为 ${dzi文件名}_files，并且在同目录
  const tileSource = '/dzi/name.dzi';
    ```
  
  - 打开图片
  
    ```js
    viewer.open(tileSource);
    ```

#### 绘制覆盖层 [viewer.addOverlay](https://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#addOverlay)

```js
const overlayOption = {
    id: 'overlays-div', // 设置overlay的id
    className: 'mark-rect', // 设置overlay的类名
    px: 400, // 起始位置x
    py: 400, // 起始位置y
    width: 1000, // 设置宽度
    height: 300, // 设置高度
};

viewer.addOverlay(overlayOption);
```



#### 视图常见操作 [viewer.viewport](https://openseadragon.github.io/docs/OpenSeadragon.Viewport.html)

```js
// 获取视图对象
const viewport = viewer.viewport;
// 转化实际像素坐标为图像相对坐标，return一个point对象
viewport.imageToViewportCoordinates(x,y);
// 手动更改缩放率， ps：第二个参数可以直接定义中心坐标点，但是缩放率不变动的话，第二个参数不会生效
viewport.zoomTo(maxZoom,point);
// 移动到对应坐标点（只支持转换后的相对坐标）
viewport.panTo(point);
```

