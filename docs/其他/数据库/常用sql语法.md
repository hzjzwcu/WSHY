# sql基础语句

| 语句                                                         | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT id,city FROM Customers;                               | 从全部记录中返回**id**和**city**属性                         |
| SELECT `DISTINCT` city FROM Customers;                       | 从全部记录中返回不重复的**city**                             |
| SELECT `COUNT`(DISTINCT city) FROM Customers;                | 所有不重复的**city**的数量                                   |
| SELECT * FROM Customers<br/>`WHERE` Country='Mexico';        | 选择**Country='Mexico'**的记录                               |
| SELECT * FROM Products<br/>WHERE Price `BETWEEN` 50 AND 60;  | 选择**Price** 在50到60之间的记录                             |
| SELECT * FROM Products<br/>WHERE Price `<>` 18;              | 选择**Price** 不是18的记录                                   |
| SELECT * FROM Customers<br/>WHERE City `LIKE` 's%';          | 选择City以s开头的记录                                        |
| SELECT * FROM Customers<br/>WHERE City `IN` ('Paris','London'); | 选择City是Paris或者London的记录                              |
| SELECT * FROM Products<br/>ORDER BY Price `ASC`;             | 按**Price**由低到高升序排列<br />ASC可省略                   |
| SELECT * FROM Products<br/>ORDER BY Price `DESC`;            | 按**Price**由高到低降序排列                                  |
| SELECT * FROM Customers<br/>ORDER BY Country `ASC`, CustomerName `DESC`; | 多条件排序<br />**优先**前者升序，后者降序                   |
| SELECT * FROM Customers<br/>WHERE Country = 'Spain' `AND` CustomerName LIKE 'G%'; | 多条件筛选<br />名称以G开头并且西班牙客户                    |
| SELECT * FROM Customers<br/>WHERE Country = 'Spain'  `OR` CustomerName LIKE 'G%'; | 多条件筛选<br />名称以G开头或者西班牙客户                    |
| SELECT * FROM Customers<br/>WHERE `NOT` Country = 'Spain';   | 非西班牙客户                                                 |
| SELECT * FROM Customers<br/>WHERE CustomerName `NOT LIKE` 'A%'; | 名字非A开头                                                  |
| INSERT INTO Users (id, name)<br/>VALUES (1, 'Tom');          | 插入数据<br />如果要插入全部数据且顺序正确时，<br />Users后面的部分可以省略（不推荐） |
| INSERT INTO Users (id, name)<br/>VALUES <br />(1, 'Tom1'),<br />(2, 'Tom2'); | 插入多行，用逗号分隔                                         |
| SELECT *column_names<br/>*FROM *table_name*<br/>WHERE *column_name* IS NULL; | 查找表中空数据                                               |
| UPDATE Customers<br/>SET ContactName='Juan'<br/>WHERE Country='Mexico'; | 更新语句，省略`WHERE`会更新全部                              |
| DELETE FROM *table_name* WHERE *condition*;                  | 删除语句，省略`WHERE`会删除全部                              |
| DROP TABLE Customers;                                        | 删除表                                                       |
| SELECT * FROM Customers<br/>LIMIT 3;                         | 截取前三个                                                   |
| SELECT * FROM Customers<br/>ORDER BY CustomerName DESC;      | 降序排序                                                     |
| SELECT * FROM Customers<br/>ORDER BY CustomerName ASC;       | 升序排序，ASC可忽略                                          |
| SELECT MIN(Price)<br/>FROM Products;                         | 最小值                                                       |
| SELECT MAX(Price) AS SmallestPrice<br/>FROM Products;        | 最大值并重命名                                               |
| SELECT COUNT(*)<br/>FROM Products;                           | 总个数                                                       |
| SELECT COUNT(DISTINCT Price)<br/>FROM Products;              | 去重后的总个数                                               |
| SELECT SUM(Quantity)<br/>FROM OrderDetails;                  | 总和                                                         |
| SELECT AVG(Price)<br/>FROM Products;                         | 平均值                                                       |
| SELECT * FROM Products<br/>WHERE price > (SELECT AVG(price) FROM Products); | 查找大于平均值的记录                                         |
| SELECT * FROM t WHERE a LIKE 'a%';                           | 以a开头的记录，通配符%表示任意个字符                         |
| SELECT * FROM t WHERE a LIKE 'a_';                           | 通配符_表示一个字符                                          |
| SELECT * FROM Customers<br/>WHERE Country IN ('Germany', 'France', 'UK'); | 指定多个值查询<br />`NOT IN`表示相反                         |
| SELECT * FROM t1<br/>WHERE id IN (SELECT id FROM t2);        | 两个表联合查询                                               |
| SELECT * FROM Products<br/>WHERE Price NOT BETWEEN 10 AND 20; | 指定范围查询<br />`NOT BETWEEN`表示相反                      |
| SELECT * FROM Orders<br/>WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31'; | 指定日期范围                                                 |
| SELECT o.id, c.n, o.d<br/>FROM Orders o<br/>INNER JOIN Customers c ON o.id= c.id; | 内联接，选择列个表内有匹配值的记录<br />`INNER`可省略        |
| SELECT column_names<br/>FROM table1<br/>LEFT JOIN table2<br/>ON table1.common_field = table2.common_field; | 左联接，即时右表没有匹配值，也会填充NULL<br />`RIGHT JOIN`右联接类似 |
| SELECT A.name AS n1, B.name AS n2, A.City<br/>FROM Customers A, Customers B<br/>WHERE A.name <> B.name<br/>AND A.City = B.City<br/>ORDER BY A.City; | 自连接，对同一个表中的数据进行排列组合                       |
| SELECT *column_name(s)* FROM *table1*<br/>UNION<br/>SELECT *column_name(s)* FROM *table2*; | 组合多个`select`的结果并去重，数据类型要一致<br />`UNION ALL`不去重，速度会更快一点 |
| SELECT COUNT(CustomerID), Country<br/>FROM Customers<br/>GROUP BY Country; | 将结果集中的记录分组<br />通常与聚合函数（如 `SUM`、`COUNT`等）一起使用<br />以便对每个分组执行某种计算 |
| SELECT Salesperson, SUM(Amount) AS TotalSales<br/>FROM Sales<br/>GROUP BY Salesperson<br/>HAVING SUM(Amount) > 10000; | **`WHERE` 子句**：分组前对行过滤，适用于非聚合条件。 <br />**`HAVING` 子句**：分组和聚合后对分组进行过滤 |
| SELECT name FROM t1<br/>WHERE EXISTS (<br/>    SELECT 1 FROM t2<br/>    WHERE t2.id= t1.id<br/>); | 至少有一条订单的所有客户<br />`EXISTS`用于判断子查询有没有返回 |
| SELECT name FROM t1<br/>WHERE id = ANY<br/> (SELECT id FROM t2 WHERE q= 10); | 比较一个值与子查询返回的任意值<br />`ANY`表示一个符合即可<br />`ALL`表示全部都要符合 |
| CREATE TABLE new_employees AS<br/>SELECT * FROM employees<br/>WHERE join_date > '2010-01-01'; | 将查询到的值复制到一个新表中                                 |
| INSERT INTO t1(name, City) <br />SELECT name, City FROM t2;  | 将选择的值插入到另一个表中，要求数据格式正确                 |
| SELECT Name, Department, Salary,<br/>CASE <br/>    WHEN Department = 'Sales' THEN Salary * 1.10<br/>    WHEN Department = 'Engineering' THEN Salary * 1.15<br/>    ELSE Salary * 1.05<br/>END AS AdjustedSalary<br/>FROM Employees; | CASE语句返回一个动态计算的值                                 |
| SELECT name, num1 + COALESCE(num2, 0)<br/>FROM Products;     | COALESCE返回第一个非NULL值，可接受多个参数<br />IFNULL同作用，不过接收参数更只有两个 |
| DELIMITER //<br/><br/>CREATE PROCEDURE UpdateSalary(IN EmpID INT, IN NewSalary DECIMAL(10,2))<br/>BEGIN<br/>    UPDATE Employees<br/>    SET Salary = NewSalary<br/>    WHERE EmployeeID = EmpID;<br/>END //<br/><br/>DELIMITER ; | 创建函数                                                     |
| CALL UpdateSalary(123, 75000.00);                            | 调用函数                                                     |

