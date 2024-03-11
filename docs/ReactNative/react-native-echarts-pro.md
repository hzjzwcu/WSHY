# react-native-echarts-pro

## 一、安装

查看[官网文档](https://supervons.github.io/react-native-echarts-pro-docs/zh-cn/docs/intro)安装，要注意的是`react-native-webview`需要手动安装，因为echarts-pro代码中需要用到

```
npm i react-native-webview
```

## 二、属性

具体可见：[参考文档](https://supervons.github.io/react-native-echarts-pro-docs/zh-cn/docs/tutorial-basics/props)

| 属性名                    | 类型    | 默认值      | 必填 | 描述                                                         |
| ------------------------- | ------- | ----------- | ---- | ------------------------------------------------------------ |
| height                    | Number  | 400         | Y    | 图表区域高度                                                 |
| width                     | Number  | auto        | N    | 图表区域宽度                                                 |
| option                    | Object  | null        | Y    | 图表核心配置项，请参考：[Apache ECharts - options](https://echarts.apache.org/en/option.html#title) |
| backgroundColor           | String  | transparent | N    | 背景颜色                                                     |
| themeName                 | String  | -           | N    | 内置主题 ，六种可选: `vintage` `dark` `macarons` `infographic` `shine` `roma` |
| webViewSettings           | Object  | null        | N    | 自定义 WebView 容器属性                                      |
| formatterVariable         | Object  | null        | N    | 如果 formatter 使用了动态单位变量，使用此属性传入            |
| extension                 | object  | null        | N    | 动态扩展支持，如词云、水球图等                               |
| customMapData             | Object  | world JSON  | N    | 自定义地图数据，默认为世界地图 JSON                          |
| eventActions              | Object  | null        | N    | 自定义传入事件                                               |
| fontFamilies              | Array   | []          | N    | 自定义字体数组                                               |
| enableParseStringFunction | Boolean | false       | N    | 开启后，`function` 将以字符串进行传递                        |

## 三、示例

> 以下示例都忽略了配置项，详细请参考：[Apache ECharts - options](https://echarts.apache.org/en/option.html#title)

`height`/`width`/`option`/`backgroundColor`

```tsx
<RNEChartsPro
    backgroundColor="#e0e0e0"
    height={400}
    width={300}
    option={option}
    />
```

`themeName`/`webViewSettings`

```tsx
<RNEChartsPro
    themeName="dark"
    webViewSettings={{  style: { width: 200 }  }}
    />
```

`formatterVariable`动态单位，需要和`enableParseStringFunction`一起使用才能生效

```tsx
const MyChartComponent = () => {
  const option = {
    // ...
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: `function (val) {
              return val + formatterVariable.unit;
            }`,
      },
    },
  };

  return (
	<RNEChartsPro
        enableParseStringFunction
        formatterVariable={{ unit: '￥' }}
    	option={option}
      />
  );
};
```

`extension`：除了内置图表以外，还支持更多三方图表样式，以下面的水球图为例：

```tsx
export default function App(): React.JSX.Element {
    const liquidOption = {
        series: [
            {
                type: "liquidFill",
                data: [0.6],
                color: ["#afb11b"],
                itemStyle: {
                    opacity: 0.6,
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.9,
                    },
                },
            },
        ],
    };

    return (
      <RNEChartsPro
          option={liquidOption}
          extension={
                [
                    "https://cdn.jsdelivr.net/npm/echarts-liquidfill@3.0.0/dist/echarts-liquidfill.min.js",
                ]
            } />
    );
}


```

`customMapData`自定义地图，数据可以从[geojson](https://geojson.io/)下载，例如[中国](https://github.com/supervons/react-native-echarts-pro/blob/master/src/components/Echarts/map/chinaJson.js)地图

```tsx
import ChinaJsonData from "./chinaJson.js";
export default function Demo2() {
    return (
 		<RNEChartsPro
            height={350}
            option={option}
            customMapData={ChinaJsonData}
            />
    );
}
```

`eventActions`自定义图表事件，详细的[事件列表](https://echarts.apache.org/zh/api.html#events)

```jsx
  return (
	<RNEChartsPro
        eventActions={{
          finished:()=>{
            alert(1)
          },
        }}
      />
  );
```

`fontFamilies` 自定义字体，参考[文档](https://supervons.github.io/react-native-echarts-pro-docs/zh-cn/docs/tutorial-fontfamily/custom)将字体转换为base64。然后新建js模块导出

```tsx
const FangSong =  `
@font-face {
    font-family: 'FangSong';    
    src: url('base64字体....');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
`
<RNEChartsPro
    height={250}
    option={option}
    fontFamilies={
        [
            { fontName: "FangSong", fontFile: FangSong }
        ]
    }
    />
```

