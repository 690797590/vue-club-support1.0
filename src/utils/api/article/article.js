import axios from 'axios';
import publicPath from "@/utils/api/api.js";

let base = publicPath.pathUrl().domain;

/*分页查询博客信息*/
export const APIblogList = params => {
    return axios.get(`${base}/admin/blog/list`, {params: params});
};
/*通过id查找博客信息*/
export const APIblogListById = params => {
    return axios.get(`${base}/admin/blog/findById`, {params: params});
};
/*博客信息删除*/
export const APIblogDelete = params => {
    return axios.get(`${base}/admin/blog/delete`, {params: params});
};
/*添加或者修改博客*/
export const APIblogSave = params => {
    return axios.post(`${base}/admin/blog/save`, params);
};

