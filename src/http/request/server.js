import axios from 'axios'

// 创建
const serive = axios.create({
    baseURL: 'https://www.fastmock.site/mock/bb59843923193b940bf0eb749918d940/store',
    timeout: 5000
})

function getTokenByLocal(){
    let token = sessionStorage.getItem('token') || '';
    return token;
}

// 拦截器
//request请求拦截器  //formdata
serive.interceptors.request.use(
    config =>{
        if(getTokenByLocal()){
            config.headers['token'] = getTokenByLocal();
            config.headers['ContentType'] = "application/json;charset=utf-8";
        }
        return config
    },
    error =>{
        Promise.reject(error)
    }
)

//response 响应拦截器
serive.interceptors.response.use(
    response =>{
        let res = response.data;
        if(res.code == '404'){
            console.log('404');
        }else if(res.code == '500'){
            console.log('500');
        }
        return Promise.resolve(response.data)
    },
    error =>{
        return Promise.reject(error);
    }
)
// 导出
export default serive