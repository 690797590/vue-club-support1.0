import axios from 'axios';
import publicPath from "@/utils/api/api.js";

let base = publicPath.pathUrl().domain;

/*分页查询博客类别信息*/
export const APIblogTypeList = params => {
    return axios.get(`${base}/admin/blogType/list`, {params: params});
};
/*添加或者修改博客类别*/
export const APIblogTypeSave = params => {
    return axios.post(`${base}/admin/blogType/save`, params);
};
/*博客类别删除*/
export const APIblogTypeDelete = params => {
    return axios.get(`${base}/admin/blogType/delete`, {params: params});
};