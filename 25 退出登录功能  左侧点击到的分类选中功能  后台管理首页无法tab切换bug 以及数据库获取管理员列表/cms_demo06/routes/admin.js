const router = require('koa-router')();
//引入模块
const url = require('url');

//配置中间件 获取url的地址
router.use(async (ctx, next) => {
    //console.log(ctx.request.header.host);
    console.log("ctx.state:" + JSON.stringify(ctx.state, null, 2))
    //模板引擎配置全局的变量
    ctx.state.__HOST__ = 'http://' + ctx.request.header.host;
    //console.log(ctx.request.url);  //   /admin/user
    //  /admin/login/code?t=709.0399997523431
    var pathname = url.parse(ctx.request.url).pathname.substring(1);

    //左侧菜单选中
    var splitUrl = pathname.split('/');
    //全局的userinfo
    ctx.state.G = {
        url: splitUrl,
        userinfo: ctx.session.userinfo
    }

    //权限判断
    if (ctx.session.userinfo) {
        //配置全局信息
        await next();
    } else {  //没有登录跳转到登录页面
        if (pathname == 'admin/login' || pathname == 'admin/login/doLogin' || pathname == 'admin/login/code') {
            await next();
        } else {
            ctx.redirect('/admin/login');
        }
    }
})


const login = require('./admin/login.js');
const user = require('./admin/user.js');

const manage = require('./admin/manage.js');


router.get('/', async (ctx) => {
    ctx.render('admin/index');
})

router.use('/login', login);
router.use('/user', user);
router.use('/manage', manage);


module.exports = router.routes();