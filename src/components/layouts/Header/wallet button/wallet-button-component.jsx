import "./wallet-button-style.scss"

import { UseWalletInfo } from "../../../../context/wallet/WalletContext";

import HeaderItem from "../header button component/Header-btn-component"
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";
import activeWalletIcon from "../../../../assest/icon/pink-wallet.png"

export default function WalletButton() {

    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

    return (<>
        {(userData == undefined)
            ?
            <HeaderItem click={authenticate}>
                <div className="wallet-button-wrapper">
                    <img src={headerWalletIcon} style={{ marginRight: "5px" }} />
                    <p>Wallet</p>
                </div>
            </HeaderItem>
            :
            <HeaderItem style={{ color: "#8053ff" }} click={onSignOut}>
                <div className="wallet-button-wrapper">
                    <img src={activeWalletIcon} style={{ marginRight: "5px" }} />
                    <p>Wallet</p>
                </div>
            </HeaderItem>
        }
    </>)
}