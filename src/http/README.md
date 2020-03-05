
# 使用说明
## 第一步: 解析路由

```javascript
// 路由格式
export default {
    loginIn: '/api/loginIn',
    loginOut: '/api/loginOut'
}
```

```javascript
import login from './api/login'
// 解析路由
myServer.parseRouter('login', login)
// 导出
export default myServer
```

## 第二步: 入口文件引入myServer

```javascript
import Vue from 'vue'
import http from './http'

// 挂在Vue的原型上,供全局使用
Vue.prototype.$http = http
```

## 第三步: 调用方法


```javascript
// async/await
async created () {
  let res = await this.$http.shop.shopList()
  this.shopList = res.data.data
}

// 或者

created () {
    this.$http.shop.shopList().then(res => {
        this.shopList = res.data.data
    })
}
```