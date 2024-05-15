import axiosInstance from "../axiosConfig";

export const getShopBlogs = (shopId: string) => axiosInstance.get<{ data: Blog[] }>(`blogs/shops/${shopId}`).then(res => res.data)