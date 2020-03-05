import server from './server'
import qs from 'qs' // 序列化get参数

function myServer () {
    this.server = server
    this.nowHandle = null // 存储当前调用组件的this
}

/**
 * 设置当前调用的组件this
 * obj 组件的this
 */
myServer.prototype.v = function (obj) {
    this.nowHandle = obj
    return this // 链式操作
}

/**
 * 解析api路由
 * moduleName 模块名
 * urlObj url对象
 */
myServer.prototype.parseRouter = function (moduleName, urlObj) {
    // let obj = {}
    // this[name] = obj
    let obj = this[moduleName] = {} // 简写

    Object.keys(urlObj).forEach(item => {
        obj[item] = this.sendMsg.bind(this, moduleName, item, urlObj[item])
    })
}

/**
 * 发送请求
 * moduleName 模块名
 * apiName api名
 * url 请求地址
 * config 请求配置
 */
myServer.prototype.sendMsg = function (moduleName, apiName, url, reqConfig) {
    let config = reqConfig || {}
    let type = config.type || 'get' // 请求类型
    let data = config.data || {} // 请求数据
    let bindName = config.bindName || null // 绑定this的名字
    let self = this
    let curApiFn = this[moduleName][apiName]

    // 请求完毕, 返回api数据res前
    let before = function (res) {
        console.log('before:')
        curApiFn.status = 'ready' // 请求状态 ready || pending

        if (bindName) {
            defaultFn(res)
            bindName = null
        }
        return res
    }

    let defaultFn = function (res) { // 自动绑定到组件this
        self.nowHandle[bindName] = res
        self.nowHandle = null // 清空组件this状态
        console.log('defaultFn')
    }

    // 策略模式
    let typeMap = {
        'get': function () {
            let urlQs = url + qs.stringify(data)
            return server.get(urlQs)
        },
        'post': function () {
            return server.post(url, data)
        }
    }
    
    let promise = null
    if (!curApiFn.status || curApiFn.status === 'ready') { // 防止同一个请求重复提交
        curApiFn.status = 'pending' // 当前请求pending中
        promise = typeMap[type]().then(before) // 执行响应方法的请求, 返回promise
    }
    return promise
}

export default new myServer