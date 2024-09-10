import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DashboardLayoutDecideFragmentOrLink = ({ linkTo, isExternalLink, children }: { linkTo: string | null; isExternalLink?: boolean; children: React.ReactNode }) => {
    if (!linkTo) return <>{children}</>;
    if (!isExternalLink) return <Link style={{ width: "100%" }} to={linkTo}>{children}</Link>;
    else return <ChakraLink style={{ width: "100%" }} href={linkTo} target="_blank">{children}</ChakraLink>;
};

export default DashboardLayoutDecideFragmentOrLink