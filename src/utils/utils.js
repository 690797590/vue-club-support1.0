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
 * ex:setCookie("name","xiaoming","s20"); s20:20秒,h12:12小时,d30:30天
 **/
export const setCookie = (name, value, time) => {
    let strsec = getsec(time) || "2592000000";
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
    if (!str) return;
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

/**
 * 获取cookie
 **/
export const getCookie = (cookieName) => {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split("; ");
    console.log(arrCookie)
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
            return arr[1];
        }
    }
    return "";
}

/**
 * 删除cookie
 **/
export const delCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
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
    delCookie,
    setCache,
    getCache,
    removeCache
}