import { createQueryString } from "../_utils/with.query";
import axiosInstance from "../axiosConfig";
import { ImockupGeneratorService, IpodAvailableVariantsService, IpodCategoryProductService, IpodCategoryService, IpodGenerateMockupService, IpodPrintPositionsService, IpodProductService, IpodVariantsService, IproviderIDService, PODCategory } from "./interfaces";

export const providersService = () => {
    return axiosInstance.get("pod/providers")
};

export const providerIDService = ({ prodviderID }: IproviderIDService) => {
    return axiosInstance.get(`pod/provider/${prodviderID}/products`)
};

export const podProductService = ({ pod_blank_product_id }: IpodProductService) => {
    return axiosInstance.get(`pod/product/${pod_blank_product_id}`)
};

export const podVariantsService = ({ provider, productId }: IpodVariantsService) => {
    return axiosInstance.get(`pod/variant-options/${provider}/${productId}`)
};

export const podAvailableVariantsService = ({ provider, productId, templateID }: IpodAvailableVariantsService) => {
    return axiosInstance.get(`pod/available-variants/${provider}/${productId}${templateID ? `/${templateID}` : ''}`)
};

export const podPrintPositionsService = ({ provider, productId }: IpodPrintPositionsService) => {
    return axiosInstance.get(`pod/print-positions/${provider}/${productId}`)
};

export const podGenerateMockupService = ({ productId, params }: IpodGenerateMockupService) => {
    return axiosInstance.post(`pod/generate-mockup/${productId}`, params)
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

export const getPodProductService = (productID: string) => {
    return axiosInstance.get(`pod/printful/techniques/product/${productID}`)
};