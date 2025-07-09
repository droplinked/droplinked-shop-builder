import { Box } from "@chakra-ui/react";
import React from "react";
import { renderSVGContent, renderSVGDefs } from "utils/helpers/walletConnectionUtils";

interface BackgroundSVGProps {
    variant: string;
    color: string;
}

const BackgroundSVG: React.FC<BackgroundSVGProps> = ({ variant, color }) => {
    return (
        <Box as="svg" width="100%" height="100%" viewBox="0 0 625 400" fill="none" position="absolute">
            {renderSVGDefs(variant, color)}
            {renderSVGContent(variant)}
        </Box>
    );
};

export default BackgroundSVG; 