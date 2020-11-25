const router = require('koa-router')();
const user = require('./admin/user.js');
const focus = require('./admin/focus.js');
const newscate = require('./admin/newscate.js');
const login = require('./admin/login.js');

router.use(async (ctx, next) => {
    ctx.state.__ROOT__ = 'http://' + ctx.header.host;
    await next();
})

//配置admin的子路由  层级路由
router.get('/', (ctx) => {
    ctx.render('admin/index');
})

router.use('/user', user);

router.use('/focus', focus);

router.use('/login', login);

router.use('/newscate', newscate);

module.exports = router.routes();