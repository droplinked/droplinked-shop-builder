import AppIcons from "assest/icon/Appicons";
import React from "react";

export const OPTIONS = [
    {
        icon: <AppIcons.Dashboard />, label: 'dashboard', path: ''
    },
    {
        icon: <AppIcons.ProductsIcon />, label: 'Products', path: '/products'
    },
    {
        icon: <AppIcons.CollectionIcon />, label: 'Collections', path: '/collections'
    },
    {
        icon: <AppIcons.OrderIcon />, label: 'Orders', path: '/orders'
    },
    {
        icon: <AppIcons.InformationIcon />, label: 'Affiliate', path: '/affiliate'
    },
    // {
    //     icon: <AppIcons.NFT />, label: 'NFTs', path: '/nfts'
    // },
    {
        icon: <AppIcons.SettingIcon />, label: 'Settings', path: '/settings/shop-info'
    },
]