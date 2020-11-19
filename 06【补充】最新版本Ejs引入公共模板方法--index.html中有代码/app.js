		//引入
		const Koa = require('koa')
		const Router = require('koa-router')
		const views = require('koa-views')		
		//实例化
		const app = new Koa()
		const router = new Router()
		//配置中间件		
		app.use(views('views', { map: {html: 'ejs' }}));  

		//配置路由
		router.get('/', async (ctx) => {
		    let title = 'hello ejs'
		    await ctx.render('index',{
		        title: title,
				msg:"this is msg"
		    })
		})		


		//启动路由
		app.use(router.routes())
		//用在匹配路由router.routes()之后，根据ctx.status设置response响应头信息
		//可配置也可以不配置，建议配置
		app.use(router.allowedMethods())
		//监听端口
		app.listen(3000)  