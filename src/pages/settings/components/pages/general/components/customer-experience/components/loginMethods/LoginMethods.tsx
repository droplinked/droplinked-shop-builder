import { authSupportedWalletsService } from "lib/apis/auth/services";
import SectionContent from "pages/settings/components/common/SectionContent";
import React from "react";
import { useQuery } from "react-query";
import MethodItem from "./MethodItem";
import { Grid } from "@chakra-ui/react";
import SkeletonLoading from "./SkeletonLoading";
import useAppStore from "lib/stores/app/appStore";

export default function LoginMethods() {
    const { shop: { loginMethods } } = useAppStore()
    // const shopLoginMethods: string[] = loginMethods.flatMap((item) =>
    //     item.wallets.map((wallet) => wallet.name)
    // )
    //TODO: Don't forgot to check the permissions 
    const { isFetching, data } = useQuery(
        "supported-login-methods",
        authSupportedWalletsService
    );
    // const walletsData = data?.data?.data.flatMap((item) =>
    //     item.wallets.map((wallet) => { return { ...wallet, isActivated: shopLoginMethods.includes(wallet.name) } })
    // );
    // console.log(walletsData)
    const walletsData = data?.data?.data
    console.log(walletsData)

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
                        walletsData?.map((item, index) => {
                            return <MethodItem wallets={item.wallets} key={index} />;
                        })
                    )}
                </Grid>
            }
        />
    );
}
