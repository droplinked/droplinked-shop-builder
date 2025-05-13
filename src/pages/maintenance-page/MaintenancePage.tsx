import { Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MaintenancePage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Checks if the user is in a dashboard route
    const isDashboardRoute = pathname.startsWith("/analytics") || pathname.startsWith("/shop-management");
    const buttonText = isDashboardRoute ? "Dashboard" : "Homepage";

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
                    We’re Temporarily Unavailable
                </AppTypography>
                <AppTypography fontSize={16} fontWeight={400} color="#B1B1B1">
                    Our system is currently undergoing maintenance to improve your experience. We’re working hard to bring everything back online as quickly as possible.
                </AppTypography>
            </Flex>
            <AppButton
                variant="secondary"
                rightIcon={<AppIcons.BackArrow style={{ rotate: "180deg" }} />}
                onClick={handleNavigate}
            >
                Go to {buttonText}
            </AppButton>
        </Flex>
    );
}

export default MaintenancePage