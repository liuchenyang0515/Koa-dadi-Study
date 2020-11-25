const router = require('koa-router')();
//引入模块
const login = require('./admin/login.js');
const user = require('./admin/user.js');

router.use(async (ctx, next) => {
    console.log(ctx)
    ctx.state.__HOST__ = 'http://' + ctx.request.header.host; // 为了设置模版引用css路径为绝对路径，提取域名
    await next()
})

router.get('/', async (ctx) => {
    ctx.body = "后台管理";
})

router.use('/login', login);
router.use('/user', user);


module.exports = router.routes();