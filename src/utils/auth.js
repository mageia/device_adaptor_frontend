export function getToken() {
    return localStorage.getItem('TOKEN');
}
export function getUser() {
    return JSON.parse(localStorage.getItem('USER'));
}
export function setToken(token) {
    return localStorage.setItem('TOKEN', token);
}
export function setUser(user) {
    return localStorage.setItem('USER', user);
}
export function removeToken() {
    return localStorage.removeItem('TOKEN');
}
export function removeUser() {
    return localStorage.removeItem('USER');
}