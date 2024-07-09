import { Flex, VStack } from "@chakra-ui/layout";
import AppIcons from "assest/icon/Appicons";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import FieldLabel from "components/common/form/fieldLabel/FieldLabel";
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import useAppToast from "functions/hooks/toast/useToast";
import { IAuthSupportedWalletsService } from "lib/apis/auth/interfaces";
import { useGetPermissionValue } from "lib/stores/app/appStore";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";
import technicalContext from "pages/register-pages/pages/technical/context";
import React, { useContext, useMemo, useState } from "react";
import { handleActivateWallet, makePayments } from "./wallets.helpers";
import WalletsAccordionPayment from "./wallets.accordion.payment";

function WalletsAccordion({ chain, payment }: { chain: IAuthSupportedWalletsService; payment: any }) {
    const getPermissionValue = useGetPermissionValue();
    const { showToast } = useAppToast();
    const {
        state: { loginMethods, paymentMethods },
        updateState,
    } = useContext(technicalContext);
    const [isExpanded, setExpanded] = useState(false);

    const ChainIcon = useMemo(() => <BlockchainDisplay blockchain={chain?.name?.toUpperCase()} show="icon" props={{ width: "24px", height: "24px" }} />, [chain?.name]);
    const wallets = {
        METAMASK: <AppIcons.MetaMaskIcon />,
        UNISAT: <AppIcons.Unisat />,
        "METAMASK (XRPLSIDECHAIN)": <AppIcons.MetaMaskIcon />,
        XVERSE: <AppIcons.Xverse />,
        PHANTOM: <AppIcons.Phantom width={"24px"} height={"24px"} />,
    };
    const targetChain = loginMethods?.find((c) => c?.name?.toUpperCase() === chain?.name?.toUpperCase());

    return (
        <Flex direction={"column"} gap={"24px"} borderRadius={"8px"} padding={"24px"} backgroundColor={"#141414"}>
            <Flex justifyContent={"space-between"} alignItems="center" style={{ cursor: "pointer" }} onClick={() => setExpanded(!isExpanded)}>
                <Flex alignItems={"center"} gap={"16px"}>
                    {ChainIcon}
                    <AppTypography fontSize={"14px"} fontWeight={"bold"} color={"#C2C2C2"}>
                        {chain?.name && capitalizeFirstLetter(chain?.name)}
                    </AppTypography>
                </Flex>
                <AppIcons.ArrowDown style={{ transition: ".3s", ...(isExpanded && { transform: "rotate(180deg)" }) }} />
            </Flex>

            {isExpanded && (
                <VStack align={"stretch"} spacing={"24px"}>
                    <VStack align={"stretch"} spacing={"0px"}>
                        <FieldLabel label="User Login Methods" textProps={{ fontSize: "14px", fontWeight: "500" }} isRequired />
                        <AppTypography fontSize="14px" color="#C2C2C2">
                            Allow or deny login option for each wallet
                        </AppTypography>
                    </VStack>
                    {chain?.wallets?.map((wallet, index) => {
                        const isChecked = targetChain && targetChain?.wallets?.find((w) => w?.name === wallet?.name) ? true : false;
                        const foundedPaymentMethod = makePayments({
                            paymentMethods: paymentMethods,
                            paymentPublic: payment,
                        })?.find((payment_method) => payment_method?.type?.toUpperCase() === chain?.name?.toUpperCase());
                        return (
                            <>
                                <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                                    <Flex alignItems={"center"} gap={"8px"}>
                                        {wallets[wallet.name.toUpperCase()] || ChainIcon}
                                        <AppTypography color={"#C2C2C2"}>{wallet?.name}</AppTypography>
                                    </Flex>
                                    <AppSwitch
                                        onChange={(e) => handleActivateWallet({ ...wallet, isActivated: e.currentTarget.checked }, loginMethods, chain, showToast, getPermissionValue, updateState)}
                                        isChecked={isChecked}
                                    />
                                </Flex>
                                {index === 0 && foundedPaymentMethod && (
                                    <VStack align={"stretch"} gap={"16px"}>
                                        <FieldLabel label="Target Wallet" textProps={{ fontSize: "14px", color: "#C2C2C2", fontWeight: "600" }} />
                                        {foundedPaymentMethod?.tokens?.map((token, idx) => <WalletsAccordionPayment key={idx} chain={foundedPaymentMethod} token={token} /> )}
                                    </VStack>
                                )}
                            </>
                        );
                    })}
                </VStack>
            )}
        </Flex>
    );
}

export default WalletsAccordion;
