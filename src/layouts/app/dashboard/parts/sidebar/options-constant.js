
import ProductsIcon from "assest/icon/products-icon.svg";
import collectionIcon from "assest/icon/collection-icon.svg";
import settingIcon from "assest/icon/setting-icon.svg";
import orderIcon from "assest/icon/order-icon.svg";
import informationIcon from "assest/icon/information-icon.svg";
import rulesetsIcon from "assest/icon/rulesets-icon.svg";

import { appDeveloment } from "lib/utils/app/variable";


export const OPTIONS = [
    {
        icon:ProductsIcon, label:'products' ,path:'products'
    },
    {
        icon:collectionIcon, label:'collections' ,path:'collections'
    },
    {
        icon:rulesetsIcon, label:'ruleset' ,path:'rules'
    },
    {
        icon:orderIcon, label:'orders' ,path:'orders'
    },
    {
        icon:informationIcon, label:'affiliate', path: appDeveloment?"affiliate":'products' 
    },
    {
        icon:settingIcon, label:'setting' ,path:'settings/shop-info'
    },
]