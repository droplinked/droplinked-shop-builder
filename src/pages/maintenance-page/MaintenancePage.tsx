import { Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import arLocale from "locales/maintenance-page/ar.json";
import enLocale from "locales/maintenance-page/en.json";

function MaintenancePage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { t } = useLocaleResources("maintenancePage", {
        ar: arLocale,
        en: enLocale,
    })

    // Checks if the user is in a dashboard route
    const isDashboardRoute = pathname.startsWith("/analytics") || pathname.startsWith("/shop-management");
    const buttonText = isDashboardRoute ? t("button.dashboard") : t("button.homepage");

    // Handles navigation to the appropriate page
    const handleNavigate = () => navigate(isDashboardRoute ? "/analytics/dashboard" : "/");

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            gap={9}
            my={!isDashboardRoute ? "4rem" : undefined}
        >
            <AppImage
                width="500px"
                height="500px"
                src="https://upload-file-droplinked.s3.amazonaws.com/73e41aa957001b34d9101d8dce854372d9660273f767466466f11bf5c1c7cbf9.png"
                alt="Maintenance Illustration"
                objectFit="contain"
            />

            <Flex maxWidth="600px" direction="column" gap={4} textAlign="center">
                <AppTypography fontSize={20} fontWeight={700} color="#fff">
                    {t("title")}
                </AppTypography>
                <AppTypography fontSize={16} fontWeight={400} color="#B1B1B1">
                    {t("description")}
                </AppTypography>
            </Flex>
            <AppButton
                variant="secondary"
                rightIcon={<AppIcons.BackArrow style={{ rotate: "180deg" }} />}
                onClick={handleNavigate}
            >
                {t("button.goTo")} {buttonText}
            </AppButton>
        </Flex>
    );
}

export default MaintenancePage