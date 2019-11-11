import axios from 'axios'
import store from '@/store/index.js'
import {
    getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: "", // api的base_url
    // headers: {
    //     post: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     }
    // },
    timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (config.url !== '/interface/auth/login' && store.getters.token) {
        config.headers['Authorization'] = getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    console.log(config)
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response
        if (res.status !== 200) {
            console.error(res.msg)
            if (res.status === 401 || res.status === 403) {
                // Message({
                //     message: "用户未登录，请重新登录",
                //     type: 'error',
                //     duration: 5 * 1000
                // })
                store.dispatch('user/Logout').then(() => {
                    location.reload()
                })
            } else {
                return Promise.reject(res.msg)
            }
        } else {
            return response
        }
        // return response.data;
    },

    // response => response,
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
    error => {
        console.log('err' + error) // for debug
        if (error.response.status === 401 || error.response.status === 403) {
            // this.$message({
            //     message: "用户未登录，请重新登录!",
            //     type: "success",
            //     duration: 5 * 1000
            // });
            store.dispatch('user/Logout').then(() => {
                location.reload()
            })
        } else if (error.response.status === 'ECONNABORTED') {
            return Promise.reject('网络连接超时')
        }
        return Promise.reject(error)
    }
)

export default service