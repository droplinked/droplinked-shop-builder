import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Illustration from "assest/image/maintenance-illustration.svg";
import { Flex, Image } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import AppIcons from "assest/icon/Appicons";

export default function Maintenance() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isInDashboard = pathname.startsWith("/analytics") || pathname.startsWith("/shop-management");

    const handleNavigate = () => {
        navigate(isInDashboard ? "/analytics" : "/");
    };

    return (
        <Flex {...(!isInDashboard && { my: "4rem" })} gap={9} flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
            <Image src={Illustration} />
            <Flex maxWidth={"600px"} textAlign={"center"} gap={4} flexDir={"column"}>
                <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>
                    We’re Temporarily Unavailable
                </AppTypography>
                <AppTypography fontSize={16} fontWeight={400} color={"#B1B1B1"}>
                    Our system is currently undergoing maintenance to improve your experience. We’re working hard to bring everything back online as quickly as possible.
                </AppTypography>
            </Flex>
            <Button
                sx={{ path: { stroke: "#2BCFA1" } }}
                onClick={handleNavigate}
                variant="secondary"
                bg={"transparent"}
                border={"none"}
                color={"#2BCFA1"}
                rightIcon={<AppIcons.BackArrow style={{ rotate: "180deg" }} />}
            >
                Go to {`${isInDashboard ? "Dashboard" : "Homepage"}`}
            </Button>
        </Flex>
    );
}
