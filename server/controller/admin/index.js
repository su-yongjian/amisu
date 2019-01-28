const Router = require("koa-router");
const { query } = require("../../libs/koa-better-mysql.js");
const proving = require('../../token/proving')
const goodsModel = require('./sql')
const {
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
} = require("../../utils/sql.js");

let router = new Router({ prefix: "/admin" });

router.get("/", async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: "succ",
    method: "get"
  };
});

router.get("/goodsList", async (ctx, next) => {
  let token = ctx.request.header.authorization ;
  if(token){
    let res = proving(token);
    console.log(res);
    if(res && res.exp <= new Date()/1000){
      ctx.body = {
        message: 'token过期',
        code:3
      };
    }else{
      let key = "";
      let val = "";
      let sql = QUERY_TABLE("tb_goodslist", { key, val });
      console.log(sql);
      let dbdata = await query(sql);
    
      dbdata.map((v, idx) => {
        let ndate = new Date(parseInt(v.update_time));
        v.update_time = ndate.toLocaleDateString().replace(/\//g, "-") +  " " +
          ndate.toTimeString().substr(0, 8);
        return v;
      });
    
      ctx.body = {
        code: 0,
        msg: "succ",
        results: dbdata
      };
    }
  }else{
    ctx.body = {
      msg:'没有token',
      code:401
    }
  }
  
});
router.post("/addGoods", async (ctx, next) => {
  let goods_name = ctx.request.body.goods_name;
  let goods_desc = ctx.request.body.goods_desc;
  let shop_price = ctx.request.body.shop_price;
  let goods_stock = ctx.request.body.goods_stock
    ? ctx.request.body.goods_stock
    : 0;
  let update_time = Number(new Date());
  // let searchSpl = QUERY_TABLE('tb_goodslist',{key:'goods_name',val:goods_name})
  let searchSpl = `select * from tb_goodslist where goods_name='${goods_name}'`;
  let re = await query(searchSpl);
  console.log(re);

  if (re.length > 0) {
    ctx.body = {
      code: -1,
      msg: "该商品已经存在",
      results: []
    };
  } else {
    let searchLength = `select COUNT(*) from tb_goodslist`;
    let len = await query(searchLength);
    let totle = len[0]["COUNT(*)"];
    if (totle >= 20) {
      let sear_id = `select goods_id from tb_goodslist order by update_time desc`;
      let sear_data = await query(sear_id);
      let del_id = sear_data[0].goods_id;
      let delSql = `delete from tb_goodslist where goods_id=${del_id}`;
      let delbdata = await query(delSql);
      let key = "goods_name,goods_desc,shop_price,goods_stock,update_time";
      let val = `'${goods_name}','${goods_desc}','${shop_price}','${goods_stock}','${update_time}'`;
      let insertSql = INSERT_TABLE("tb_goodslist", { key, val });

      let dbdata = await query(insertSql);
      ctx.body = {
        code: 0,
        msg: "succ",
        results: dbdata
      };
    } else {
      let key = "goods_name,goods_desc,shop_price,goods_stock,update_time";
      let val = `'${goods_name}','${goods_desc}','${shop_price}','${goods_stock}','${update_time}'`;
      let insertSql = INSERT_TABLE("tb_goodslist", { key, val });

      let dbdata = await query(insertSql);
      ctx.body = {
        code: 0,
        msg: "succ",
        results: dbdata
      };
    }
  }
});
router.post('/deleteGoods',async (ctx,next)=>{

  console.log(ctx.request.body);
  
  let goods_id = ctx.request.body.goods_id ;
  await goodsModel.deleteGoods(goods_id).then(res=>{

    if(res.affectedRows==1){
      ctx.body = {
        code:0,
        msg:'succ',
        result:[]
      }
    }else{
      ctx.body = {
        code:1,
        msg:'商品不存在',
        result:[]
      }
    }
  }).catch(() => {
      ctx.body = 'error'
  })
})
// 二级路由
// router.use(user_router.routes()).use(user_router.allowedMethods())
module.exports = router;
