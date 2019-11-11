import {
    loginByUsername,
    logout,
    updateToken
} from '@/api/login'
import {
    getToken,
    setToken,
    removeToken,
    setUser,
    removeUser
} from '@/utils/auth'

import jwtDecode from 'jwt-decode'

export default {
    // 用户登录
    LoginByUsername({
        commit
    }, {
        username,
        password
    }) {
        return new Promise((resolve, reject) => {
            loginByUsername(username, password).then(response => {
                let token = response.data.token
                let user = jwtDecode(token)
                setToken(token)
                setUser(JSON.stringify(user))
                commit('SET_TOKEN', token)
                commit('SET_USER', user)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 用户登出
    Logout({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_USER', {})
            removeToken()
            removeUser()
            resolve()
        }).catch(error => {
            reject(error)
        })
    },

    // 获取用户信息
    UpdateToken({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            updateToken().then(response => {
                const data = response.data
                setToken(data.token)
                setUser(JSON.stringify(data.user))
                commit('SET_TOKEN', data.token)
                commit('SET_USER', data.user)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}