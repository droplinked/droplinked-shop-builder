import { Grid } from "@chakra-ui/react";
import { authSupportedWalletsService } from "lib/apis/auth/services";
import SectionContent from "pages/settings/components/common/SectionContent";
import React from "react";
import { useQuery } from "react-query";
import MethodItem from "./MethodItem";
import SkeletonLoading from "./SkeletonLoading";

export default function LoginMethods() {
    const { isFetching, data } = useQuery(
        "supported-login-methods",
        authSupportedWalletsService,
    );
    const loginMethodsData = data?.data?.data ?? []

    return (
        <SectionContent
            title="Login Methods"
            description="Allow customers to log in and connect from the following options to interact with the storefront."
            rightContent={
                <Grid
                    templateColumns={{ base: "1fr", md: "1fr", xl: "repeat(2, 1fr)" }}
                    gap={4}
                    width="100%"
                >
                    {isFetching ? (
                        <SkeletonLoading />
                    ) : (
                        loginMethodsData?.map((item, index) => {
                            return <MethodItem method={item} key={index} />;
                        })
                    )}
                </Grid>
            }
        />
    );
}
