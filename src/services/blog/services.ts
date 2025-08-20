import axiosInstance from "lib/axiosConfig";
import { createQueryString } from "utils/helpers/urlUtils";
import { Blog, IBlogFetchParams, ICheckSlug } from "./interfaces";

export const createBlogService = (blog: Blog) => axiosInstance.post("blogs", blog)

export const checkBlogSlugAvailabilityService = (params: ICheckSlug) => axiosInstance.post("blogs/check-slug", params)

export const getShopBlogsService = (params: IBlogFetchParams) => {
    const queryParams = createQueryString(params).toString()
    return axiosInstance.get(`blogs?${queryParams}`).then(res => res.data)
}

export const getBlogByIdService = (id: string) => axiosInstance.get<{ data: Blog }>(`blogs/${id}`).then(res => res.data)

export const updateBlogService = (blog: Blog) => axiosInstance.put(`blogs/${blog._id}`, blog)

export const deleteBlogService = (blogId: string) => axiosInstance.delete(`blogs/${blogId}`)

export const getPublicBlogsService = (params: IBlogFetchParams) => {
    const queryParams = createQueryString(params).toString();
    return axiosInstance.get(`/blogs/public/admin?${queryParams}`);
};

export const getPublicBlogBySlugService = (slug: string) => axiosInstance.get(`/blogs/public/admin/${slug}`).then(res => res?.data)