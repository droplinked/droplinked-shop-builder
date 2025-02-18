import AppIcons from 'assest/icon/Appicons';
import { SHOP_URL } from 'lib/utils/app/variable';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import { IShopCurrency } from 'types/interface/shopCurrency.interface';
import { ProfileItem } from './interfaces';

export const PROFILE_CONSTANTS = (shop: { credit: number; name: string; shopDomain: string; currency: IShopCurrency }, logoutUser: () => void): ProfileItem[] => [
  {
    title: { label: 'Credit', style: {} },
    icon: { svg: AppIcons.ProfileCredit, style: {} },
    linkTo: null,
    isExternalLink: false,
    rightSide: {
      value: `${shop.currency?.symbol}${currencyConvertion(Number(shop?.credit), shop.currency?.conversionRateToUSD, false)} ${shop.currency?.abbreviation}`,
      style: {
        color: '#2BCFA1',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px'
      }
    }
  },
  {
    title: { label: 'View shop', style: {} },
    icon: { svg: AppIcons.ProfileShop, style: {} },
    linkTo: shop?.shopDomain ? `https://${shop?.shopDomain}` : `${SHOP_URL}/${shop.name}`,
    isExternalLink: true,
    rightSide: { value: null, style: {} }
  },
  {
    title: { label: 'Settings', style: {} },
    icon: { svg: AppIcons.ProfileSetting, style: {} },
    linkTo: '/analytics/account-settings',
    isExternalLink: false,
    rightSide: { value: null, style: {} }
  },
  {
    title: { label: 'Help Center', style: {} },
    icon: { svg: AppIcons.ProfileSupport, style: {} },
    linkTo: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked',
    isExternalLink: true,
    rightSide: { value: null, style: {} }
  },
  {
    title: { label: 'Log out', style: { color: '#F24' } },
    icon: { svg: AppIcons.ProfileLogout, style: { color: '#FFF' } },
    linkTo: null,
    isExternalLink: false,
    rightSide: { value: null, style: {} },
    action: logoutUser
  }
];
