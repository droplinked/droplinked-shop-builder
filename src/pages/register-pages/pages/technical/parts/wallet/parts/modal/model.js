import casper from "assest/icon/casper.svg";
import CasperWallet from "assest/icon/CasperWallet.svg";
import MetaMask from "assest/icon/MetaMask.svg";
import NEARWallet from "assest/icon/NEARWallet.svg";
import UnstoppableDomains from "assest/icon/UnstoppableDomains.svg";
import WalletConnect from "assest/icon/WalletConnect.svg";

export default class walletModalClass {
    static listWallet = () => {
        return [
            {
                title: "Casper Signer",
                icon: casper
            },
            {
                title: "Casper Wallet",
                icon: CasperWallet
            },
            {
                title: "Wallet Connect",
                icon: WalletConnect
            },
            {
                title: "MetaMask",
                icon: MetaMask
            },
            {
                title: "NEAR Wallet",
                icon: NEARWallet
            },
            {
                title: "Unstoppable Domains",
                icon: UnstoppableDomains
            }
        ]
    }
}