import fetch from '@/utils/fetch'

export function getConfigSample() {
    return fetch({
        url: '/interface/getConfigSample',
        method: 'get',
    })
}

export function getCurrentConfig() {
    return fetch({
        url: '/interface/getCurrentConfig',
        method: 'get',
    })
}

export function createData(type, data) {
    return fetch({
        url: `/interface/plugin/${type}/`,
        method: 'post',
        data
    })
}

export function deleteData(type, id) {
    return fetch({
        url: `/interface/plugin/${type}/${id}`,
        method: 'delete'
    })
}

export function getData(type, id) {
    return fetch({
        url: `/interface/plugin/${type}/${id}`,
        method: 'get'
    })
}

export function updateData(type, id, data) {
    return fetch({
        url: `/interface/plugin/${type}/${id}`,
        method: 'put',
        data
    })
}

export function getPointMap(id) {
    return fetch({
        url: '/interface/pointMap/' + id,
        method: 'get'
    })
}
export function probePointMap(id) {
    return fetch({
        url: '/interface/probePointMap/' + id,
        method: 'get'
    })
}
export function updatePointMap(id, data) {
    return fetch({
        url: '/interface/pointMap/' + id,
        method: 'put',
        data
    })
}
