import { createQueryString } from "../_utils/with.query";
import axiosInstance from "../axiosConfig";
import { Blog, IBlogFetchParams, ICheckSlug } from "./interfaces";

export const createBlogService = (blog: Blog) => axiosInstance.post("blogs", blog)

export const checkBlogSlugAvailabilityService = (params: ICheckSlug) => axiosInstance.post("blogs/check-slug", params)

export const getShopBlogsService = (params: IBlogFetchParams) => {
    const queryParams = createQueryString(params).toString()
    return axiosInstance.get(`blogs?${queryParams}`).then(res => res.data)
}

export const getBlogByIdService = (shopId: string, slug: string) => axiosInstance.get<{ data: Blog }>(`blogs/shops/${shopId}/${slug}`).then(res => res?.data)

export const getPublicBlogByIdService = (slug: string) => axiosInstance.get(`/blogs/admin/shop-builder/${slug}`).then(res => res?.data)

export const updateBlogService = (blog: Blog) => axiosInstance.put(`blogs/${blog._id}`, blog)

export const deleteBlogService = (blogId: string) => axiosInstance.delete(`blogs/${blogId}`)

export const getSuperAdminBlogs = () => axiosInstance.get(`/blogs/admin/shop-builder`)