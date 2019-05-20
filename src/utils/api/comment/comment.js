import axios from 'axios';
import publicPath from "@/utils/api/api.js";

let base = publicPath.pathUrl().domain;

/*分页查询评论信息*/
export const APIcommentList = params => {
    return axios.get(`${base}/admin/comment/list`, {params: params});
};
/*博客评论审核*/
export const APIcommentReview = params => {
    return axios.get(`${base}/admin/comment/review`, {params: params});
};
/*登录*/
export const APIcommentDelete = params => {
    return axios.get(`${base}/admin/comment/delete`, {params: params});
};
