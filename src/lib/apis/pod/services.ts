import axiosInstance from "../axiosConfig";
import { ImockupGeneratorService, IpodAvailableVariantsService, IpodCategoryService, IpodGenerateMockupService, IpodPrintPositionsService, IpodProductService, IpodVariantsService, IproviderIDService, IpodCategoryProductService } from "./interfaces";

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

export const podCategoryService = ({ mainCategoryId }: IpodCategoryService) => {
    return axiosInstance.get(`pod/printful/categories${mainCategoryId ? `?mainCategoryId=${mainCategoryId}` : ''}`)
};

export const podCategoryProductService = ({ subCategoryId }: IpodCategoryProductService) => {
    return axiosInstance.get(`pod/printful/products?subCategoryId=${subCategoryId}`)
};