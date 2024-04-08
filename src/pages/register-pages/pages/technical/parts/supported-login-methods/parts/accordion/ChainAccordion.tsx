import { Flex } from '@chakra-ui/layout';
import AppIcons from 'assest/icon/Appicons';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppSwitch from 'components/common/swich';
import AppTypography from 'components/common/typography/AppTypography';
import { IAuthSupportedWalletsService } from 'lib/apis/auth/interfaces';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import technicalContext from 'pages/register-pages/pages/technical/context';
import React, { useCallback, useContext, useMemo, useState } from 'react';

interface Props {
    chain: IAuthSupportedWalletsService,
}

function ChainAccordion({ chain }: Props) {
    let { state: { loginMethods }, updateState } = useContext(technicalContext)
    const [isExpanded, setExpanded] = useState(false);
    const ChainIcon = useMemo(() => <BlockchainDisplay blockchain={chain.name.toUpperCase()} show="icon" props={{ width: "24px", height: "24px" }} />, [chain.name])
    const wallets = {"METAMASK": <AppIcons.MetaMaskIcon/>, "UNISAT": <AppIcons.Unisat/>, "METAMASK (XRPLSIDECHAIN)": <AppIcons.MetaMaskIcon/>, "XVERSE": <AppIcons.Xverse/>}
    const handleActivateWallet = useCallback((wallet: { name: string, isActivated: boolean }) => {
        const selectedLoginMethods = [...loginMethods]
        const targetChain = selectedLoginMethods.findIndex(c => c.name === chain.name)
        if (wallet.isActivated) {
            targetChain > -1 ?
                selectedLoginMethods[targetChain].wallets.push({ ...wallet }) :
                selectedLoginMethods.push({ ...chain, wallets: [{ ...wallet }] })
        }
        else {
            if (selectedLoginMethods.length === 1 && loginMethods[0].wallets.length === 1) return
            selectedLoginMethods[targetChain].wallets = selectedLoginMethods[targetChain].wallets.filter(w => w.name !== wallet.name)
            if (!selectedLoginMethods[targetChain].wallets.length) {
                selectedLoginMethods.splice(targetChain, 1)
            }
        }
        updateState("loginMethods", selectedLoginMethods)
    }, [loginMethods, updateState, chain])

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
                chain.wallets.map((wallet, index) => {
                    const targetChain = loginMethods.find(c => c.name === chain.name)
                    const isChecked = targetChain && targetChain.wallets.find(w => w.name === wallet.name) ? true : false
                    return < Flex key={index} justifyContent={"space-between"} alignItems={"center"} >
                        <Flex alignItems={"center"} gap={"8px"}>
                            {wallets[wallet.name.toUpperCase()] || ChainIcon}
                            <AppTypography color={"#C2C2C2"}>{wallet.name}</AppTypography>
                        </Flex>
                        <AppSwitch onChange={(e) => handleActivateWallet({ ...wallet, isActivated: e.currentTarget.checked })} isChecked={isChecked} />
                    </Flex>
                })
            }
        </Flex >
    )
}

export default ChainAccordion