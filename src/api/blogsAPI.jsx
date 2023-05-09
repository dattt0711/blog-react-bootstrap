import { axiosBodyToAPI, sendQueryToAPI } from './common';
import queryString from 'query-string';

const API_CREATE_BLOG = "http://localhost:3003/blogs/create";
const API_INFO_BLOG = "http://localhost:3003/blogs/info";
const API_LIST_BLOG = "http://localhost:3003/blogs/list";
const API_DELETE_BLOG = "http://localhost:3003/blogs/delete";
const API_EDIT_BLOG = "http://localhost:3003/blogs/edit";

export const fetchCreateBlog = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_CREATE_BLOG, body);
};
export const fetchDeleteBlogApi = (params) => {
    const body = params;
    return axiosBodyToAPI('DELETE', API_DELETE_BLOG, body);
};
export const fetchListBlogsApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_BLOG}${queryParams}`);
};
export const fetchInfoBlogApi = (params = {}) => {
    return sendQueryToAPI(`${API_INFO_BLOG}/${params}`);
};
export const fetchEditBlog = (params) => {
    const body = params;
    return axiosBodyToAPI('PUT', API_EDIT_BLOG, body);
};