### 循环:
{{each list as value index}}
  <li>索引 {{i + 1}} ：{{value}}</li>
{{/each}}

//亦可以被简写：
{{each list}}
    <li>{{$index}} - {{$value.user}}</li>
{{/each}}

### 判断:
{{if admin}}
    <p>admin</p>
{{else if code > 0}}
    <p>master</p>
{{else}}
    <p>error!</p>
{{/if}}


### 导入子模板
{{include 'template_name'}}
子模板默认共享当前数据，亦可以指定数据：
{{include 'template_name' news_list}}
### 嵌入子模板(include)
```
<script id=‘test‘ type=‘text/html‘>
    <h1>My Life</h1>
    {{include ‘list‘}}
</script>
<script id=‘list‘ type=‘text/html‘>
    <ul>
        {{each list as value i}}
                <li>索引{{i+1}}：{{value}}</li>
        {{/each}}
    </ul>
</script>
<script>
    var data = {
        "list":[‘篮球‘,‘桌球‘,‘游泳‘,‘滑轮‘,‘读书‘]
    };
    var html = template(‘test‘,data);
    $(‘.rascal‘).html(html);
</script>
上面代码中，要注意几点的就是：
　　♥ 遍历表达式中的list必须与脚本中data对象中的list同名，而且遍历表达式中的list必须是data对象中的一个属性。循环表达式中，要循环的是每一个data对象中的list数组，而不是data对象，这点很重要。
　　在这个例子中，data对象中list属性是一个数组，数组中的每一个值都是简单数据类型，篮球桌球等。当然，可以往数组中传入复杂数据类型，如对象。说明这个主要是因为在循环表达式中循环的数据和给template()传入第二个参数的时候很容易出错。
　　♥ 使用template方法时，第一个参数必须是id，而不能是class。
```