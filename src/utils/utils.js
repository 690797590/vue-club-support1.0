import Cookie from 'js-cookie'
import Vue from 'vue'

Vue.filter("formatDate", function formatDate(value) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
});
Vue.filter("formatDateTime", function formatDateTime(value) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
});


export const isNotNullORBlank = (...args) => {
    for (var i = 0; i < args.length; i++) {
        var argument = args[i];
        if (argument == null || argument == '' || argument == undefined) {
            return false;
        }
    }
    return true;
}


/**
 * 设置cookie
 **/
export const setCookie = (key, value) => {
    return Cookie.set('name', 'value');
}

/**
 * 获取cookie
 **/

export const getCookie = (key) => {
    return Cookie.getCookie(key);
}


/**
 * 设置、获取、删除缓存
 **/
export const setCache = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

export const getCache = (key) => {
    return localStorage.getItem(key);
}

export const removeCache = (key) => {
    localStorage.removeItem(key);
}

export default {
    isNotNullORBlank,
    setCookie,
    getCookie,
    setCache,
    getCache,
    removeCache
}