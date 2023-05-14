import { appDeveloment } from "lib/utils/app/variable";
import AppIcons from "assest/icon/Appicons";
import React from "react";

export const OPTIONS = [
    {
        icon: <AppIcons.productsIcon />, label: 'products', path: 'products'
    },
    {
        icon: <AppIcons.collectionIcon />, label: 'collections', path: 'collections'
    },
    {
        icon: <AppIcons.rulesetsIcon />, label: 'ruleset', path: 'rules'
    },
    {
        icon: <AppIcons.orderIcon />, label: 'orders', path: 'orders'
    },
    {
        icon: <AppIcons.informationIcon />, label: 'affiliate', path: appDeveloment ? "affiliate" : 'products'
    },
    {
        icon: <AppIcons.settingIcon />, label: 'setting', path: 'settings/shop-info'
    },
]