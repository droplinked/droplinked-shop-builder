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
                icon: <AppIcons.CasperIcon {...size} />
            },
            {
                title: "Casper Wallet",
                icon: <AppIcons.CasperWalletIcon {...size} />
            },
            {
                title: "Wallet Connect",
                icon: <AppIcons.WalletConnectIcon {...size} />
            },
            {
                title: "MetaMask",
                icon: <AppIcons.MetaMaskIcon {...size} />
            },
            {
                title: "NEAR Wallet",
                icon: <AppIcons.NearWalletIcon {...size} />
            },
            {
                title: "Unstoppable Domains",
                icon: <AppIcons.UnstoppableDomainsIcon {...size} />
            }
        ]
    }
})

export default walletModalClass