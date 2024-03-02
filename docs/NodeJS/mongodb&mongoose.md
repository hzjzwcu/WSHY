# mongodb&mongoose

## mongodb初始化

### 创建数据库

- `admin`表创建一个 `user`并设置密码并给`userAdminAnyDatabase`的权限

    ```shell
    use admin;
    db.createUser({user: 'admin', pwd: 'e2zcLOKyw1J7', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});
    ```

- 业务表创建一个`user`并设置密码并给`dbAdmin`和`dbOwner`的权限

    ```shell
    use hzjzwcu;
    db.createUser({user: 'mydbuser', pwd: '123456', roles: [{role: 'dbAdmin', db: 'hzjzwcu'}, {role: 'dbOwner', db: 'hzjzwcu'}]});
    ```

- 找到 `mongod.cfg` ，在末尾添加

    ```shell
    security:
      authorization: enabled
    ```

- 重启 mongodb 服务

### 常用指令

> 需要用管理员身份运行

启动本地 mongodb服务

```shell
C:
cd C:\Program Files\MongoDB\Server\5.0
mongod --dbpath data
```

停止本地 mongodb服务

```shell
C:
cd C:\Program Files\MongoDB\Server\5.0
mongod --shutdown --dbpath data
```

## mongoose

### 增删改查

```javascript
// 新增
await new Model({ status:1, type:1, user:'test' }).save();
// 删除
await Model.remove({ _id:_id });
// 更新
await Model.updateOne({_id},{name:'1',price:1});
// 查询
await Model.findOne({_id});
```

### 常用查询语法

```javascript
// 单个查询
await Model.findOne({_id: 1});
// 批量查询
await Model.find({status,name,type});
// 统计个数
await Model.find({status}).count();
// 分页查询 page 为前端显示的第几页 size 为一页要几条数据
await Model.find({status}).skip((page-1) * size).limit(size);
// 简单排序查询 -1 为倒序 1 为正序
await Model.find({status}).sort({priority:-1});
// 比较大小查询 $gt(>),$gte(>=),$lt(<),$lte(<=) 查找在 d1 和 d2 这段时间之内创建的数据
await Model.find({"created":{$gte: d1,$lt: d2}});
// 简单模糊查询
await Model.find({name:{$regex:name}})
// 多条件查询
await Model.find({ $or: [{ nick: { $regex: reg } }, { email: { $regex: reg } }] });
```

### 聚合函数查询

```javascript
//商品属性：_id,  createTime,  nowPriceL,  nowPriceH,  number
//统计每一天内店铺商品的最低价和最高价，平均最低价
await Model.aggregate([
  {
    //$lookup:连表关键词，类似mysql中的left join 
    /*
    {
      from: "exhibition_institutions", //需要连接的表名
      localField: "_id", //本表需要关联的字段
      foreignField: "attribute", //被连接表需要关联的字段
      as: "institutionsData" //查询出的结果集别名
    }
    */
  },
  {
    //match中的匹配与find和findOne中相同
    $match: {
      number: {$gte:100} //匹配number>=100的记录
    }
  },
  {
    //修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档
    //对应project()方法 
    $project : {
      //_id: 0, //由于会默认展示_id，在这里设置为０，不展示
      day : { $substr: [{"$add":["$createTime", 28800000]}, 0, 10] },
      //时区数据校正，加上了8小时(换算成毫秒数为8*60*60*1000=288000)后分割成YYYY-MM-DD日期格式便于分组
      /*
        $substr: [< string > , < start > , < length > ]
        其中< string >是需截取的字符串，若为表内字段可用$加字段名。
        < start >截取开始的位置，整数，整数从0开始。若数字为负数或大于< string >的长度，则返回空字符串。
        < length >截取字符串长度，整数。若数字为负数则返回< start >后的全部的字符串。
      */
      "nowPriceL": 1, //设置原有nowPriceL为1，表示结果显示原有字段nowPriceL
      "nowPriceH":1, //设置原有nowPriceH为1，表示结果显示原有字段nowPriceH
      avgNowPriceL:{$toDouble:"$avgNowPriceL"},//把平均最低价转换为小数
      avgNowPriceH:{$toDouble:"$avgNowPriceH"},//把平均最高价转换为小数
      "dayNumber":1 //每组内有多少个成员
    },
  },
    
  { 
    $group: { 
        _id:"$day", //按照$day进行分组（一组为1天） 
        nowPriceL:{$min: "$nowPriceL"}, //查找组内最小的nowPriceL 
        nowPriceH:{$max: "$nowPriceH"}, //查找组内最大的nowPriceH  
        avgNowPriceL:{$avg:"$avgNowPriceL"},//统计每一天内店铺商品的平均最低价
        avgNowPriceH:{$avg:"$avgNowPriceH"},//统计每一天内店铺商品的平均最高价
        dayNumber:{$sum:1}   //统计当天的店铺商品数
    } 
  }, 
  { 
      $sort: {
        nowPriceL: 1//执行完 $group，得到的结果集按照nowPriceL升序排列
      }
  }
]).exec(function (err, data){
    //返回结果  
    console.log(data);
});
```
