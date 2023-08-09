import AppIcons from "assest/icon/Appicons";

const walletModalClass = ({
    listWallet: () => {
        const size = {
            width: "24px",
            height: "24px",
        }

        return [
            {
                title: "Casper Signer",
                icon: <AppIcons.casperIcon {...size} />
            },
            {
                title: "Casper Wallet",
                icon: <AppIcons.casperWalletIcon {...size} />
            },
            {
                title: "Wallet Connect",
                icon: <AppIcons.walletConnectIcon {...size} />
            },
            {
                title: "MetaMask",
                icon: <AppIcons.metaMaskIcon {...size} />
            },
            {
                title: "NEAR Wallet",
                icon: <AppIcons.nearWalletIcon {...size} />
            },
            {
                title: "Unstoppable Domains",
                icon: <AppIcons.unstoppableDomainsIcon {...size} />
            }
        ]
    }
})

export default walletModalClass