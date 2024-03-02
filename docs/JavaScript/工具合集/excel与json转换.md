# excel与json转换

## json转excel

使用 [ExcelJS](https://github.com/exceljs/exceljs/blob/master/README_zh.md) 即可实现效果

```js
let Excel = require('exceljs');

// 创建表格
let workbook = new Excel.stream.xlsx.WorkbookWriter({ filename: './test.xlsx' });
let worksheet = workbook.addWorksheet('Sheet');
worksheet.columns = [
    { header: 'col1', key: 'col1' },
    { header: 'col2', key: 'col2' },
];

// 定义数据
let dataArray = [
    { col1: '1', col2: '2' },
    { col1: '11', col2: '22' },
];
let currentNum = 0;
let length = dataArray.length;

// 添加数据
console.log('开始添加数据');
dataArray.forEach((item, i) => {
    worksheet.addRow(item).commit();
    currentNum = i;
    console.log((currentNum / length * 100).toFixed(2) + '%');
});

// 导出文件
workbook.commit();
console.log('执行完毕');

```
