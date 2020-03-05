import login from './api/login'
import shop from './api/shop'
import myServer from './request'
// 解析路由
myServer.parseRouter('login', login)
myServer.parseRouter('shop', shop)

export default myServer