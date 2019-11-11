import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }

    return fetch({
        url: '/interface/auth/login',
        method: 'post',
        data
    })
}

export function logout() {
    return fetch({
        url: '/interface/users/logout',
        method: 'post'
    })
}

export function getUserInfo(userId) {
    return fetch({
        url: '/interface/users/getUserInfo/' + userId,
        method: 'get',
    })
}

export function updateToken() {
    return fetch({
        url: '/interface/auth/refresh',
        method: 'post',
    })
}

export function verifyKey(data) {
    return fetch({
        url: '/interface/users/keyVerify',
        method: 'post',
        data
    })
}