import { appDeveloment } from "lib/utils/app/variable";
import AppIcons from "assest/icon/Appicons";
import React from "react";

export const OPTIONS = [
    {
        icon: <AppIcons.productsIcon />, label: 'Products', path: 'products'
    },
    {
        icon: <AppIcons.collectionIcon />, label: 'Collections', path: 'collections'
    },
    {
        icon: <AppIcons.orderIcon />, label: 'Orders', path: 'orders'
    },
    {
        icon: <AppIcons.informationIcon />, label: 'Affiliate', path: 'affiliate'
    },
    {
        icon: <AppIcons.settingIcon />, label: 'Settings', path: 'settings/shop-info'
    },
]