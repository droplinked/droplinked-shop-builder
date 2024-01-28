import { Flex } from '@chakra-ui/layout';
import AppIcons from 'assest/icon/Appicons';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppSwitch from 'components/common/swich';
import AppTypography from 'components/common/typography/AppTypography';
import { IAuthSupportedWalletsService } from 'lib/apis/auth/interfaces';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import technicalContext from 'pages/register-pages/pages/technical/context';
import React, { useContext, useState } from 'react';

interface Props {
    chain: IAuthSupportedWalletsService,
}

function ChainAccordion({ chain }: Props) {
    const { state: { loginMethods }, updateState } = useContext(technicalContext)
    const [isExpanded, setExpanded] = useState(false);
    const ChainIcon = <BlockchainDisplay blockchain={chain.name.toUpperCase()} show="icon" props={{ width: "24px", height: "24px" }} />

    const handleActivateWallet = (chain: IAuthSupportedWalletsService, wallet: { name: string, isActivated: boolean }) => {
        const selectedWalletChain = loginMethods.find(c => c.name === chain.name)
        if (wallet.isActivated) {
            selectedWalletChain ?
                selectedWalletChain.wallets.push({ ...wallet }) :
                loginMethods.push({ ...chain, wallets: [{ ...wallet }] })
        }
        else {
            selectedWalletChain.wallets.splice(selectedWalletChain.wallets.indexOf(wallet), 1)
            if (!selectedWalletChain.wallets.length)
                loginMethods.splice(loginMethods.indexOf(selectedWalletChain), 1)
        }
        updateState("loginMethods", loginMethods)
    }

    return (
        <Flex direction={"column"} gap={"24px"} borderRadius={"8px"} padding={"24px"} backgroundColor={"#141414"}>
            <Flex justifyContent={"space-between"} alignItems="center" style={{ cursor: "pointer" }} onClick={() => setExpanded(!isExpanded)} >
                <Flex alignItems={"center"} gap={"16px"}>
                    {ChainIcon}
                    <AppTypography fontSize={"14px"} fontWeight={"bold"} color={"#C2C2C2"}>{capitalizeFirstLetter(chain.name)}</AppTypography>
                </Flex>
                <AppIcons.ArrowDown style={{ transition: ".3s", ...isExpanded && { transform: "rotate(180deg)" } }} />
            </Flex>

            {isExpanded &&
                chain.wallets.map((wallet, index) =>
                    <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex alignItems={"center"} gap={"8px"}>
                            {ChainIcon}
                            <AppTypography color={"#C2C2C2"}>{wallet.name}</AppTypography>
                        </Flex>
                        <AppSwitch onChange={(e) => handleActivateWallet(chain, { ...wallet, isActivated: e.target.checked })} isChecked={wallet.isActivated} />
                    </Flex>
                )
            }
        </Flex>
    )
}

export default ChainAccordion