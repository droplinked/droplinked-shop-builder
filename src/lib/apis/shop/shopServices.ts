import { createQueryString } from '../_utils/with.query';
import axiosInstance from '../axiosConfig';
import {
	IchargeCreditService,
	ICustomReferralCode,
	IDeployContract,
	IGetShopCommunityProfile,
	IGetShopsCommunityService,
	IpaymentCreateService,
	IPostWithdrawCircleWallet,
	IproductService,
	IrecordedShopService,
	IshopInfoService,
	IshopPublicRecordedService,
	IShopRecordedService,
	IshopService,
	IshopUpdateService,
	IUpdateShopName,
	ShopCustomURL,
	ShopDNSInformation,
	ShopOAuth2Client,
	UserExtraShopResponse,
	UserShop,
} from './interfaces';

export const shopService = ({ shopName }: IshopService) =>
	axiosInstance.get(`shop/${shopName}`);

export const paymentPublicService = async () =>
	axiosInstance.get(`shop/public/available-payment-methods`);

export const paymentMethodsService = () => axiosInstance.get(`shop/payment-methods`);

export const paymentCreateService = (params: Array<IpaymentCreateService>) =>
	axiosInstance.post(`shop/payment-methods`, { methods: params });

export const shopPublicRecordedService = ({ page, s }: IshopPublicRecordedService) =>
	axiosInstance.get(
		`shop/public/recorded?limit=10&page=${page}${s ? '&s=' + `${s}` : ''}`
	);

export const recordedShopService = ({ shopName }: IrecordedShopService) =>
	axiosInstance.get(`shop/public/recorded/${shopName}`);

export const productService = ({ productID }: IproductService) =>
	axiosInstance.get(`product/${productID}`);

export const shopInfoService = ({ shopName }: IshopInfoService) =>
	axiosInstance.get(`shop/shopInfo/${shopName}`);

export const shopUpdateService = (params: IshopUpdateService) =>
	axiosInstance.put(`shop`, params);

export const availableTemplateService = () =>
	axiosInstance.get(`shop/available/templates`);

export const ShopRecordedService = ({
	categoryIds,
	page,
	subCategoryIds,
	title,
}: IShopRecordedService) =>
	axiosInstance.get(
		`product/community/recorded?limit=25&page=${page}${
			categoryIds ? '&categoryIds=' + `["${categoryIds}"]` : ''
		}${subCategoryIds ? '&subCategoryIds=' + `["${subCategoryIds}"]` : ''}${
			title ? '&title=' + title : ''
		}`
	);

export const chargeCreditService = (props: IchargeCreditService) =>
	axiosInstance.post(`shop/credit/charge`, props);

export const patchedChargedService = () => axiosInstance.patch(`shop/credit/charge`);

export const shopDashboardService = () =>
	axiosInstance.get(`shop/dashboard/products?limit=5`);

export const shopSellerService = () =>
	axiosInstance.get(`shop/dashboard/sellers?limit=5`);

export const bestPartnersService = () =>
	axiosInstance.get(`shop/dashboard/product-types`);

export const getShopAPIKeyService = () => axiosInstance.get(`shop/client/oauth2`);

export const updateShopAPIKeyService = (data: ShopOAuth2Client) =>
	axiosInstance.put('shop/client/oauth2 ', data);

export const getShopInformationService = () => axiosInstance.get('shop');

export const getDeployPermission = () => {
	return axiosInstance.post(`shop/deploy/skale`);
};

export const generateShopCustomURLService = (data: ShopCustomURL) =>
	axiosInstance.post('shop/domain', data);

export const getShopDNSInformationService = () => axiosInstance.get('shop/retrieve/dns');

export const getShopDNSStatusService = (data: ShopDNSInformation) =>
	axiosInstance.post('shop/retrieve/domain/info', data);

export const getShopPrivateKeyService = () =>
	axiosInstance.get('shop/retrieve/privatekey');

export const getReferralReportService = () => axiosInstance.get('shop/referral/report');

export const updateCustomReferralCodeService = (props: ICustomReferralCode) =>
	axiosInstance.patch('shop/referral/custom/code', props);

export const deployShopContractService = (props: IDeployContract) =>
	axiosInstance.patch('shop/contract/deploy', props);

export const checkUsernameAvailabilityService = (shopName: string) =>
	axiosInstance.post('shop/check-shop-name', { shopName });

export const updateShopNameService = ({ id, shopName }: IUpdateShopName) =>
	axiosInstance.put(`shop/${id}/shop-name`, { shopName });

export const getUserShopsService = () =>
	axiosInstance.get<{ data: UserShop[] }>('shop/all').then((res) => res.data);

export const createExtraShopForCurrentUserService = (name: string) =>
	axiosInstance
		.post<{ data: UserExtraShopResponse }>('shop/create/extra', { name })
		.then((res) => res.data);

export const switchShopService = (shopId: string) =>
	axiosInstance.post('shop/switch', { shopId }).then((res) => res.data);

export const getShopsCommunityService = (params: IGetShopsCommunityService) => {
	const queryString = createQueryString(params).toString();
    return axiosInstance.get(`/shop/community/view?${queryString}`);
};

export const getNewShopsService = () => axiosInstance.get('/shop/community/new')


export const getShopCommunityProfile = ({shopId}: IGetShopCommunityProfile) => axiosInstance.get(`/shop/community/view/products/${shopId}`)


export const getShopGrowthHack = () => axiosInstance.get('/shop/growth/list')

export const postCreateCircleWallet = () => axiosInstance.post('/shop/circle/wallet')

export const getCircleWallet = () => axiosInstance.get('/shop/circle/wallet')

export const postWithdrawCircle = (props :IPostWithdrawCircleWallet) => axiosInstance.post('/shop/circle/withdraw', {...props})
