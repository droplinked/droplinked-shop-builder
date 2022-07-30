

import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
import { Image } from "@chakra-ui/react"

import HeaderItem from "../header-button/Header-btn-component"
import headerWalletIcon from "../../../../../assest/icon/headerWalletIcon.svg";
import activeWalletIcon from "../../../../../assest/icon/pink-wallet.png"

export default function WalletButton() {

    const { onSignOut, userData, authenticate } = UseWalletInfo();

    return (
        <HeaderItem
            click={(userData == undefined) ? authenticate : onSignOut}
            color={(userData == undefined) ? '#fff' : '#8053ff'}
        >
            <Image
                w={{ base: "15px", md: '25px' }}
                h={{ base: "15px", md: '25px' }}
                mr='5px'
                src={(userData == undefined) ? headerWalletIcon : activeWalletIcon}
            />
            Wallet
        </HeaderItem>
    )
}