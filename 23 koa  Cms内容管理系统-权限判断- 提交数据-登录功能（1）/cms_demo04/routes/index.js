const router = require('koa-router')();

router.get('/', async (ctx) => {
    ctx.body = "还没有开始动工，请访问后台";
})

module.exports = router.routes();