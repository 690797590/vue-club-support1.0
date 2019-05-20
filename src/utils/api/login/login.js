import axios from 'axios';
import publicPath from "@/utils/api/api.js";

let base = publicPath.pathUrl().domain;

/*登录*/
export const APIlogin = params => {
    return axios.post(`${base}/blogger/login`, params);
};
/*退出登录*/
export const APIlogoute = params => {
    return axios.get(`${base}/admin/blogger/logout`, {params: params});
};