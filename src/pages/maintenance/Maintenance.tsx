import { Flex, Image } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Illustration from "assest/image/maintenance-illustration.svg";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Maintenance() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isInDashboard = pathname.startsWith("/analytics") || pathname.startsWith("/shop-management");
    const buttonText = isInDashboard ? "Dashboard" : "Homepage";

    const handleNavigate = () => navigate(isInDashboard ? "/analytics" : "/");

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            gap={9}
            my={!isInDashboard ? "4rem" : undefined}
        >
            <Image src={Illustration} alt="Maintenance Illustration" />
            <Flex maxWidth="600px" direction="column" gap={4} textAlign="center">
                <AppTypography fontSize={20} fontWeight={700} color="#fff">
                    We’re Temporarily Unavailable
                </AppTypography>
                <AppTypography fontSize={16} fontWeight={400} color="#B1B1B1">
                    Our system is currently undergoing maintenance to improve your experience. We’re working hard to bring everything back online as quickly as possible.
                </AppTypography>
            </Flex>
            <Button
                variant="secondary"
                border="none"
                bg="transparent"
                color="#2BCFA1"
                rightIcon={<AppIcons.BackArrow style={{ rotate: "180deg" }} />}
                sx={{ path: { stroke: "#2BCFA1" } }}
                onClick={handleNavigate}
            >
                Go to {buttonText}
            </Button>
        </Flex>
    );
}

export default Maintenance