import axiosInstance from "../axiosConfig"
import { IproductByIdServices, IproductDeleteServices, IproductList, IProductReorder, IproductState, IProductTile, IproductUpdateServices } from "./interfaces"

export const productServices = ({ page, limit, filter }: IproductList) => {
    return axiosInstance.get(`product?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`)
}

export const productCreateServices = (params: IproductState) => {
    return axiosInstance.post("product", params)
}

export const productUpdateServices = ({ productID, params }: IproductUpdateServices) => {
    return axiosInstance.put(`product/${productID}`, params)
}

export const productDeleteServices = ({ productID }: IproductDeleteServices) => {
    return axiosInstance.delete(`product/${productID}`)
}

export const productByIdServices = ({ productID, shopname }: IproductByIdServices) => {
    return axiosInstance.get(`product/public/${productID}?shopname=${shopname}&recorded=true`)
}

export const printServicesServices = () => {
    return axiosInstance.get(`product/public/print-services`)
}

export const generateBufferServices = (urls: Array<string>) => {
    return axiosInstance.post(`product/generate/image/buffer`, urls)
}

export const productCategoryervices = () => {
    return axiosInstance.get(`product/public/categories/main`)
}

export const productsShopervices = (shopname: string) => {
    return axiosInstance.get(`product/public/shop/${shopname}?page=1&limit=5`)
}

export const reorderProductsService = (data: IProductReorder) => {
    return axiosInstance.post("product/reorder", data)
}

export const getAllProductsService = (signal: AbortSignal) => {
    return axiosInstance.get("/product/all", { signal })
}

export const createProductTileService = (data: IProductTile) => {
    return axiosInstance.post("/product/make/tile", data)
}

export const editProductTileService = (productTileId: string, data: IProductTile) => {
    return axiosInstance.patch(`/product/edit/tile/${productTileId}`, data)
}

export const deleteProductTileService = (productTileId: string) => {
    return axiosInstance.delete(`/product/tile/${productTileId}`)
}

export const getProductTileService = (productTileId: string) => {
    return axiosInstance.get(`/product/tile/${productTileId}`)
}

export const duplicateProductService = (productId: string) => {
    return axiosInstance.post(`/product/duplicate`, { productId })
}