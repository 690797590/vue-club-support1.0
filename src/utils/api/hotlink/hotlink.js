import axios from 'axios';
import publicPath from "@/utils/api/api.js";

let base = publicPath.pathUrl().domain;

/*添加或者修改友情链接*/
export const APIlinkSave = params => {
    return axios.post(`${base}/admin/link/save`, params);
};
/*友情链接删除*/
export const APIlinkDelete = params => {
    return axios.get(`${base}/admin/link/delete`, {params: params});
};
/*分页友情链接信息*/
export const APIlinkList = params => {
    return axios.get(`${base}/admin/link/list`, {params: params});
};
