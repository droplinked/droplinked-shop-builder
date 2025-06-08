import { PaymentLinkData } from "pages/payment-link/context/PaymentLinkContext";
import { Product } from "pages/products/utils/types";
import { createQueryString } from "utils/helpers/urlUtils";
import axiosInstance from "../axiosConfig";
import {
    IGetHotProductsParams,
    IGetProductsCommunityService,
    IGetSingleProductCommunity,
    IimportAffiliateProduct,
    IproductDeleteServices,
    IProductFetchParams,
    IProductReorder,
    IproductState,
    IProductUpdateService,
} from "./interfaces";

export const getShopProductsService = ({ page, limit, filter }: IProductFetchParams) =>
    axiosInstance.get(`product?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ""}`)

export const createProductService = (productData: IproductState | Product) =>
    axiosInstance.post("product", productData)

export const updateProductService = ({ productID, params }: IProductUpdateService) =>
    axiosInstance.put(`product/${productID}`, params)

export const productDeleteServices = ({ productID }: IproductDeleteServices) => {
    return axiosInstance.delete(`product/${productID}`);
};

export const printServices = () => {
    return axiosInstance.get(`product/public/print-services`);
};

export const productCategoryervices = () => {
    return axiosInstance.get(`product/public/categories/main`);
};

export const reorderProductsService = (data: IProductReorder) => {
    return axiosInstance.post("product/reorder", data);
};

export const getAllProductsService = () => {
    return axiosInstance.get("/product/all").then(res => res.data)
};

export const duplicateProductService = (productId: string) => {
    return axiosInstance.post(`/product/duplicate`, { productId });
};

export const updateProductLinkOptionsService = (options: PaymentLinkData) => {
    return axiosInstance.patch(`shop/update/product-link-options`, options);
};

export const getProductsCommunityService = (params: IGetProductsCommunityService) => {
    const queryString = createQueryString(params).toString();
    return axiosInstance.get(`/product/community/view?${queryString.toString()}`);
};

export const getSingleProductCommunityService = ({ slug, user }: IGetSingleProductCommunity) => {
    return axiosInstance.get(`/product/community${!user ? `/public/` : "/"}view/${slug}`);
};

export const importAffiliateProductService = ({ productId }: IimportAffiliateProduct) => {
    return axiosInstance.post(`/product/community/import`, { productId });
};

export const getNewProducts = () => axiosInstance.get("/product/community/new");

export const getHotProducts = (params: IGetHotProductsParams) => {
    const queryString = createQueryString(params).toString();
    return axiosInstance.get(`/product/community/view/hot?${queryString?.toString()}`);
};

export const uploadProductCSV = (formData: FormData) => {
    return axiosInstance.post("/product/import-csv", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getPODShippingAvailability = (product_id: string) =>
    axiosInstance
        .post<{ data: string[] }>("product/printful-available-shipping", { product_id })
        .then(res => res.data)

export const createDefaultSampleProducts = (logo: string) =>
    axiosInstance.post('/product/create-template-products', { logo }).then(res => res.data)