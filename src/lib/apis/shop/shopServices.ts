import axiosInstance from "../axiosConfig"
import { IchargeCreditService, ICustomReferralCode, IDeployContract, IpaymentCreateService, IproductService, IrecordedShopService, IshopInfoService, IshopPublicRecordedService, IShopRecordedService, IshopService, IshopUpdateService, IUpdateShopName, ShopCustomURL, ShopDNSInformation, ShopOAuth2Client } from "./interfaces"

export const shopService = ({ shopName }: IshopService) => axiosInstance.get(`shop/${shopName}`)

export const paymentPublicService = async () => axiosInstance.get(`shop/public/available-payment-methods`)

export const paymentMethodsService = () => axiosInstance.get(`shop/payment-methods`)

export const paymentCreateService = (params: Array<IpaymentCreateService>) => axiosInstance.post(`shop/payment-methods`, { methods: params })

export const shopPublicRecordedService = ({ page, tags }: IshopPublicRecordedService) => axiosInstance.get(`shop/public/recorded?limit=10&page=${page}${tags ? '&tags=' + `["${tags}"]` : ''}`)

export const recordedShopService = ({ shopName }: IrecordedShopService) => axiosInstance.get(`shop/public/recorded/${shopName}`)

export const productService = ({ productID }: IproductService) => axiosInstance.get(`product/${productID}`)

export const shopInfoService = ({ shopName }: IshopInfoService) => axiosInstance.get(`shop/shopInfo/${shopName}`)

export const shopUpdateService = (params: IshopUpdateService) => axiosInstance.put(`shop`, params)

export const availableTemplateService = () => axiosInstance.get(`shop/available/templates`)

export const ShopRecordedService = ({ categoryIds, page, subCategoryIds, title }: IShopRecordedService) => axiosInstance.get(`product/community/recorded?limit=25&page=${page}${categoryIds ? '&categoryIds=' + `["${categoryIds}"]` : ''}${subCategoryIds ? '&subCategoryIds=' + `["${subCategoryIds}"]` : ''}${title ? '&title=' + title : ''}`)

export const chargeCreditService = (props: IchargeCreditService) => axiosInstance.post(`shop/credit/charge`, props)

export const patchedChargedService = () => axiosInstance.patch(`shop/credit/charge`)

export const shopDashboardService = () => axiosInstance.get(`shop/dashboard/products?limit=5`)

export const shopSellerService = () => axiosInstance.get(`shop/dashboard/sellers?limit=5`)

export const bestPartnersService = () => axiosInstance.get(`shop/dashboard/product-types`)

export const getShopAPIKeyService = () => axiosInstance.get(`shop/client/oauth2`)

export const updateShopAPIKeyService = (data: ShopOAuth2Client) => axiosInstance.put("shop/client/oauth2 ", data)

export const getShopInformationService = () => axiosInstance.get("shop")

export const generateShopCustomURLService = (data: ShopCustomURL) => axiosInstance.post("shop/domain", data)

export const getShopDNSInformationService = () => axiosInstance.get("shop/retrieve/dns")

export const getShopDNSStatusService = (data: ShopDNSInformation) => axiosInstance.post("shop/retrieve/domain/info", data)

export const getShopPrivateKeyService = () => axiosInstance.get("shop/retrieve/privatekey")

export const getReferralReportService = () => axiosInstance.get("shop/referral/report")

export const updateCustomReferralCodeService = (props: ICustomReferralCode) => axiosInstance.patch("shop/referral/custom/code", props)

export const deployShopContractService = (props: IDeployContract) => axiosInstance.patch("shop/contract/deploy", props)

export const checkUsernameAvailabilityService = (shopName: string) => axiosInstance.post("shop/check-shop-name", { shopName })

export const updateUsernameService = ({ id, shopName }: IUpdateShopName) => axiosInstance.put(`shop/${id}/shop-name`, { shopName })
