import { removeFalsyValues } from '../_utils/removeFalsyValues';
import { createQueryString } from '../_utils/with.query';
import axiosInstance from '../axiosConfig';
import {
	IchargeCreditService,
	ICustomReferralCode,
	IDeployContract,
	IGetShopCommunityProfile,
	IGetShopsCommunityService,
	IPaymentPublicService,
	IPostWithdrawCircleWallet,
	IShopApiKey,
	IShopCredit,
	IshopInfoService,
	IshopUpdateService,
	IUpdateShopName,
	ShopCustomURL,
	ShopDNSInformation,
	ShopOAuth2Client,
	ShopSetupParams,
	UserExtraShopResponse,
	UserShop
} from './interfaces';

export const setupShop = (params: ShopSetupParams) =>
	axiosInstance.post(`/shop/setup`, removeFalsyValues(params));

export const paymentPublicServiceV2 = async () =>
	axiosInstance.get<{ data: IPaymentPublicService[] }>(`shop/public/available-payment-methodsV2`);

export const getShopCredit = () =>
	axiosInstance.get<IShopCredit>(`shop/credit`);

export const productService = (productId: string) =>
	axiosInstance.get(`product/${productId}`)

export const shopInfoService = ({ shopName }: IshopInfoService) =>
	axiosInstance.get(`shop/shopInfo/${shopName}`);

export const shopUpdateService = (params: IshopUpdateService) =>
	axiosInstance.put(`shop`, params);

export const availableTemplateService = () =>
	axiosInstance.get(`shop/available/templates`);

export const chargeCreditService = (props: IchargeCreditService) =>
	axiosInstance.post(`shop/credit/charge`, props);

export const getShopAPIKeyService = () => axiosInstance.get<{ data: IShopApiKey }>(`shop/client/oauth2`);

export const updateShopAPIKeyService = (data: ShopOAuth2Client) =>
	axiosInstance.put('shop/client/oauth2 ', data);

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
	axiosInstance.patch('shop/contract/deploy', props).then(res => res.data);

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


export const getShopCommunityProfile = ({ shopId }: IGetShopCommunityProfile) => axiosInstance.get(`/shop/community/view/products/${shopId}`)

export const getShopGrowthHack = () => axiosInstance.get('/shop/growth/list')

export const postCreateCircleWallet = () => axiosInstance.post('/shop/circle/wallet')

export const getCircleWallet = () => axiosInstance.get('/shop/circle/wallet')

export const postWithdrawCircle = (props: IPostWithdrawCircleWallet) => axiosInstance.post('/shop/circle/withdraw', { ...props })

export const deployCircleContract = (network: string) => axiosInstance.post('shop/circle/deploy', { type: network })

export const getCurrencyList = () =>
	axiosInstance.get<{ data: string[] }>('shop/currency-list').then(res => res.data)