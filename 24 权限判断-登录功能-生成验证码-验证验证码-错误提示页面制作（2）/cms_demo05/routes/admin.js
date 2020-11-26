const router = require('koa-router')();
//引入模块

const login = require('./admin/login.js');
const user = require('./admin/user.js');
const url = require('url');

/**
 * 一个login页面会发送几次请求，比如登录/admin/login和显示验证码/admin/login/code，
 * 以及账号密码正确/admin/login/doLogin都会命中这个中间件
 */
//配置中间件 获取url的地址
router.use(async (ctx, next) => {
    //console.log(ctx.request.header.host);

    //模板引擎配置全局的变量
    ctx.state.__HOST__ = 'http://' + ctx.request.header.host;
    console.log("ctx.request.url:"+ctx.request.url);  //   /admin/user

    //  /admin/login/code?t=709.0399997523431
    var pathname = url.parse(ctx.request.url).pathname;

    console.log("pathname:"+pathname)
    //权限判断
    if (ctx.session.userinfo) { // 登录成功，有session
        await next(); // 渲染接下来的页面
    } else {  //没有登录跳转到登录页面
        // 避免死循环，因为/admin/login页面显示验证码/admin/login/code又会命中该路由，只要包含admin就一定命中
        if (pathname == '/admin/login' || pathname == '/admin/login/doLogin' || pathname == '/admin/login/code') {
            await next();
        } else { // 没登录输入/admin，强制登录
            ctx.redirect('/admin/login');
        }
    }
})

router.get('/', async (ctx) => {
    ctx.render('admin/index');
})
// 如果没登录，到/admin/login包括验证码在内有2个请求，为了避免死循环采取的await next()就是为了命中这里
router.use('/login', login);

router.use('/user', user);

module.exports = router.routes();