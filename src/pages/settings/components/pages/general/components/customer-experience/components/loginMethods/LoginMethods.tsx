import { Grid } from "@chakra-ui/react";
import { authSupportedWalletsService } from "services/auth/services";
import SectionContent from "pages/settings/components/common/SectionContent";
import React from "react";
import { useQuery } from "react-query";
import MethodItem from "./MethodItem";
import SkeletonLoading from "./SkeletonLoading";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

export default function LoginMethods() {
    const { t } = useLocaleResources('settings');
    const { isFetching, data } = useQuery(
        "supported-login-methods",
        authSupportedWalletsService,
    );
    const loginMethodsData = data?.data?.data ?? []

    return (
        <SectionContent
            title={t("settings.customerExperience.loginMethods.title")}
            description={t("settings.customerExperience.loginMethods.description")}
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
