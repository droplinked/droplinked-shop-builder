import axiosInstance from "lib/axiosConfig";
import { createQueryString } from "utils/helpers/urlUtils";
import { ImockupGeneratorService, IpodAvailableVariantsService, IpodCategoryProductService, IpodCategoryService, IpodProductService, PODCategory } from "./interfaces";

export const podProductService = ({ pod_blank_product_id }: IpodProductService) => {
    return axiosInstance.get(`pod/product/${pod_blank_product_id}`)
};

export const podAvailableVariantsService = ({ provider, productId, templateID }: IpodAvailableVariantsService) => {
    return axiosInstance.get(`pod/available-variants/${provider}/${productId}${templateID ? `/${templateID}` : ''}`)
};

export const mockupGeneratorService = ({ params, productID }: ImockupGeneratorService) => {
    return axiosInstance.post(`pod/generate-mockup/${productID}`, params)
};

export const podCategoryService = (params: IpodCategoryService) => {
    const queryString = createQueryString(params).toString()
    return axiosInstance.get<{ data: { data: PODCategory[] } }>(`pod/printful/categories${queryString ? `?${queryString}` : ""}`)
}

export const podCategoryProductService = ({ subCategoryId }: IpodCategoryProductService) => {
    return axiosInstance.get(`pod/printful/products?subCategoryId=${subCategoryId}`)
};

export const generateThumbService = (images: Array<string>) => {
    return axiosInstance.post(`product/upload/external/images`, images)
};