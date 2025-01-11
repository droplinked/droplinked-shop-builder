import { authSupportedWalletsService } from "lib/apis/auth/services";
import SectionContent from "pages/settings/components/common/SectionContent";
import React, { useState } from "react";
import { useQuery } from "react-query";
import MethodItem from "./MethodItem";
import { Grid } from "@chakra-ui/react";
import SkeletonLoading from "./SkeletonLoading";
import { useGetPermissionValue } from "lib/stores/app/appStore";
import AppErrors from "lib/utils/statics/errors/errors";
import useAppToast from "functions/hooks/toast/useToast";

export default function LoginMethods() {
    const getPermissionValue = useGetPermissionValue();
    const [walletData, setWalletData] = useState([]);
    const { showToast } = useAppToast()
    const { isFetching } = useQuery(
        "supported-login-methods",
        authSupportedWalletsService,
        {
            onSuccess(data) {
                setWalletData(data.data.data)
            },
        }
    );

    const handleToggle = (methodName: string) => {
        const method = walletData.find(m => m.name === methodName);
        const maxActiveLoginMethodCount = getPermissionValue("web3_network_login");

        if (!method.isActivated) {
            const activeMethodsCount = walletData.filter(m => m.isActivated && m.type === "WALLET").length;

            if (!(maxActiveLoginMethodCount === "Unlimited" || method.type === "SOCIAL")) {
                if (!(activeMethodsCount < +maxActiveLoginMethodCount)) {
                    showToast({
                        message: AppErrors.permission.maxActiveLoginMethods(maxActiveLoginMethodCount),
                        type: "error"
                    });
                    return;
                }
            }
        }

        const updatedMethods = walletData.map(m =>
            m.name === methodName ? { ...m, isActivated: !m.isActivated } : m
        );
        setWalletData(updatedMethods);
    };

    return (
        <SectionContent
            title="Login Methods"
            description="Allow customers to log in and connect from the following options to interact with the storefront."
            rightContent={
                <Grid
                    templateColumns={{ base: "1fr", md: "1fr", lg: "repeat(2, 1fr)" }}
                    gap={4}
                    width="100%"
                >
                    {isFetching ? (
                        <SkeletonLoading />
                    ) : (
                        walletData?.map((item, index) => {
                            return <MethodItem method={item} key={index} onToggle={handleToggle} />;
                        })
                    )}
                </Grid>
            }
        />
    );
}
