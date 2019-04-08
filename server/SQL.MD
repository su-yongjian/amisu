常用sql语句
### 插入：INSERT INTO table (xxx,xxx,xxx) VALUES(xxx,xxxx,xxx)
### 查询：
  SELECT 列名(或者*，表示所有列) FROM 表名 WHERE 筛选条件;

  FROM 表名：顾名思义，就是从表名指定的这张表格中；
  WHERE 筛选条件：意思是“当满足筛选条件”的时候；
  SELECT 列名：意思是选择出这些记录，并且展示指定的列名；

  从tb_stu_math_score表中挑选出得分大于95分的学生姓名；
  SELECT name FROM tb_stu_math_score WHERE score >= 95;

  从tb_stu_math_score表中挑选出得分小于60分的学生姓名，
  SELECT name, number FROM tb_stu_math_score WHERE score < 60;

  从tb_stu_math_score表中挑选出得分为100分学生的所有信息(注意SELECT后面的*符号，表示所有字段)，
  SELECT * FROM tb_stu_math_score WHERE score = 100;

  高级用法：
  如有表tb_rider、tb_order两张表 

  IN 操作
  WHERE id IN(2, 4, 7)的意思就是筛选id字段的值在2，4，7这几个值当中的记录，
  SELECT name, level, level_city FROM tb_rider WHERE id IN(2, 4, 7);

  关系运算符  AND  和 OR

  查询tb_rider``表中创建时间处于2017-02-01到2017-06-01之间的数据。
  SELECT * FROM tb_rider WHERE created_at >= "2017-02-01 00:00:00" AND created_at < "2017-06-01 00:00:00";

  查询tb_rider``2017-02-01(包括当天)之前，或者2017-06-01(包括当天)之后注册的骑手所有信息。
  SELECT * FROM tb_rider WHERE created_at <= "2017-02-01 00:00:00" OR created_at >= "2017-06-01 00:00:00";

  查询tb_rider``2017-02-01(包括2017-02-01当天)到2017-06-01(不包括2017-06-01当天)期间注册的且当前是金牌等级的骑手所有信息，
  SELECT * FROM tb_rider
  WHERE created_at >= "2017-02-01 00:00:00"
  AND created_at < "2017-06-01 00:00:00"
  AND level = 3;

### 排序：ORDER BY  DESC:递减  ASC:递增
  按照运单的创建时间倒序排序把最近创建的运单排在最前面，使用ORDER BY语法:created_at字段值递减(DESC)的顺序对查询结果排序
  SELECT order_id, created_at FROM tb_order
  WHERE rider_id = 1
  AND grabbed_time >= "2017-12-30 00:00:00"
  AND grabbed_time < "2017-12-31 00:00:00"
  AND order_state = 40
  ORDER BY created_at DESC;

  更加复杂的场景：假设想要查询2017-12-30和2017-12-31两天所有运单的所有信息，并先按照骑手id递增，再按运单状态递减的顺序排序展示。
  SELECT * FROM tb_order WHERE created_at >= "2017-12-30 00:00:00" AND created_at < "2018-01-01 00:00:00"
  ORDER BY rider_id ASC, order_state DESC;
  排序是有优先级：当rider_id字段的值都相同无法区分顺序时，才会对相同rider_id的这几条数据再按照order_state字段的值进行排序：举例来说，rider_id = 2且order_state = 80的数据，也依然不可能排在rider_id = 1且order_state = 40的数据前面。


### 分页
  查询前20行的数据
  SELECT created_at FROM tb_order WHERE rider_id = 1 LIMIT 20;

### 聚合函数：COUNT，SUM, AVG
  COUNT：对查询结果集合中特定的列进行计数；
  SUM：对查询结果的某个字段进行求和；
  AVG：就是average的意思，对查询结果的某个字段计算平均值；

  #### COUNT求总
  COUNT一般拿来统计总数：COUNT(name):表示对name这一列进行统计如（需要注意的是COUNT不会对name=null的那一行进行计算：比如总数有20行，但是其中有一行name=null，则实际上统计出来结果是19）：
  SELECT COUNT(*) FROM tb_order;（统计表tb_order总数：单纯统计表总数）
  SELECT COUNT(*) FROM tb_order WHERE rider_id = 1;（统计表tb_order条件为rider_id = 1总数：单纯统计满足条件总数）
  SELECT COUNT(name) FROM tb_order;（统计表tb_order总数：以name列为准）
  SELECT COUNT(name) FROM tb_order WHERE rider_id = 1;（统计表tb_order条件为rider_id = 1总数：以name列为准）
  
  注意点:1.COUNT不会自动去重；
        2.COUNT在某一条查询结果中，用来计数的那一列的值为**“空"**时，这条记录不进行计数；

  #### SUM 求和
  SELECT SUM(merchant_customer_distance) FROM tb_order WHERE rider_id = 1 AND order_state = 40;

  #### AVG 求和
  SELECT AVG(merchant_customer_distance) FROM tb_order WHERE rider_id = 1 AND order_state = 40;

### 去重：DISTINCT 
  COUNT(DISTINCT name)就是对去重后的name进行计数
  SELECT COUNT(DISTINCT name) FROM tb_sample_1;

### 将查询数据分组：GROUP BY 语法

  SELECT rider_id, rider_name, AVG(merchant_customer_distance)
  FROM tb_order WHERE order_state = 40
  AND created_at >= "2017-12-30 00:00:00"
  AND created_at < "2017-12-31 00:00:00"
  GROUP BY rider_id;

### 聚合函数的好搭档：HAVING 语法
    HAVING语法的含义类似于WHERE，之所以有HAVING函数是因为WHERE语法是不能和聚合函数一起使用的，因此只能使用HAVING作为筛选条件的语法

    GROUP BY rider_id将SELECT的结果根据rider_id进行分组，分组完成后HAVING AVG(merchant_customer_distance) > 1.5语句对每一组的merchant_customer_distance字段值求取平均数，并且将平均数大于1.5的结果筛选出来，作为返回结果。

    SELECT rider_id, rider_name, AVG(merchant_customer_distance)
    FROM tb_order WHERE order_state = 40
    AND created_at >= "2017-12-30 00:00:00"
    AND created_at < "2017-12-31 00:00:00"
    GROUP BY rider_id
    HAVING AVG(merchant_customer_distance) > 1.5;

### Sql中常常接触的数据类型主要包括几类。
  整型：
  1：tinyint：用来表示很小很小的整数，比如常常用它作为is_deleted、is_valid这些字段的字段类型，因为这两个字段表示该条记录是否有效，只存在两个值分别是0和1；
  2：smallint：比tinyint稍微大一点点的整型，可以表示更大一点的整数，比如200、404、401这样的整数值；
  3：int：常用的整型，可以用来表示比较大的整数，比如10322(事实上int可以表示的整数范围远远比这个大)；
  4：bigint：用来表示非常大的整数，比如大多数表的自增id就会使用这个类型，可以表示类似10322903这样非常大的整数(事实上bigint可以表示的整数范围远远比这个要大)；
  
  浮点型：
   1： decimal：可以表示非常准确的小数，比如经纬度；
  
  字符串类型
  char：固定长度的字符串；
  varchar：可变长度的字符串；

  日期类型
  date：表示一个日期，只包含日期部分，不包含时间，比如当前日期"2018-01-23"；
  datetime：表示一个日期，同时包含日期部分和时间部分，比如当前日期"2018-01-23 03:01:43"；