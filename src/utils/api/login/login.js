import axios from 'axios';
import publicPath from "@/utils/api/api.js";

let base = publicPath.pathUrl().domain;

/*登录*/
export const APIlogin = params => {
    return axios.post(`${base}/blogger/login`, params);
};
/**/
export const APIgetExple = params => {
    return axios.get(`${base}/`, {params: params});
};