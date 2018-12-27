// 侧边菜单
/**
 * title:侧边栏标题
 * num:Tag排序
 * name:组件name
 * icon:侧边栏图标
 * href:路由路径
 * closable:面包屑tag是否可关闭图标x标志
 * showInTags:面包屑tag展示标志
 * showInMenus:是否展开菜单option
 * choosed:面包屑高亮标志
 */
const menus = [
    {
        title:'首页',
        num:1,
        name:'home',
        icon:'ios-home',
        href:'/',
        closable:false,
        showInTags:true,
        showInMenus:true,
        choosed:true,
    },
    {
        title:'HTML5',
        name:'HTML5',
        icon:'logo-html5',
        href:'/',
        closable:true,
        showInTags:false,
        showInMenus:true,
        choosed:false,
    },
    {
        title:'javascript',
        name:'javascript',
        icon:'logo-javascript',
        href:'/',
        closable:true,
        showInTags:false,
        showInMenus:true,
        choosed:false,
    },               
    {
        title:'css3',
        name:'css3',
        icon:'ios-flower',
        href:'/',
        closable:true,
        showInTags:false,
        showInMenus:true,
        choosed:false,
    },
    {
        title:'框架',
        name:'class-manage-parent',
        icon:'md-options',
        children:[
            {
                title:'VUE',
                name:'VUE',
                icon:'md-baseball',
                href:'/',
                closable:true,
                showInTags:false,
                showInMenus:true,
                choosed:false,
            },
            {
                title:'Angular',
                name:'Angular',
                icon:'md-barcode',
                href:'/',
                closable:true,
                showInTags:false,
                showInMenus:true,
                choosed:false,
            },
            {
                title:'React',
                name:'React',
                icon:'md-basket',
                href:'/',
                closable:true,
                showInTags:false,
                showInMenus:true,
                choosed:false,
            }
        ]
    }
];

export default menus 

