import axiosInstance from "../axiosConfig";
import { Blog, ICheckSlug, IGetPublicBlogService } from "./interfaces";

export const createBlogService = (blog: Blog) => axiosInstance.post("blogs", blog)

export const checkBlogSlugAvailabilityService = (params: ICheckSlug) => axiosInstance.post("blogs/check-slug", params)

export const getShopBlogsService = (shopId: string) => axiosInstance.get<{ data: Blog[] }>(`blogs/shops/${shopId}`).then(res => res.data)

export const getBlogByIdService = (shopId: string, slug: string) => axiosInstance.get<{ data: Blog }>(`blogs/shops/${shopId}/${slug}`).then(res => res?.data)

export const getPublicBlogByIdService = ({ slug }: IGetPublicBlogService) => axiosInstance.get(`/blogs/admin/shop-builder/${slug}`).then(res => res?.data)

export const updateBlogService = (blog: Blog) => axiosInstance.put(`blogs/${blog.seoData!.slug}`, blog)

export const getSuperAdminBlogs = () => axiosInstance.get(`/blogs/admin/shop-builder`)