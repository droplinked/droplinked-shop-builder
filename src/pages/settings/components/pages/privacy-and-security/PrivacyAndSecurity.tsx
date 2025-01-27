import { Box, Divider } from '@chakra-ui/react';
import React from "react"
import PrivateKey from './components/private-key/PrivateKey';
import PublicApiKey from './components/public-api-key/PublicApiKey';

function PrivacyAndSecurity() {
    return (
        <>
            <Box px={{ base: 4, md: 6 }} >
                <PrivateKey />
            </Box>
            <Divider borderColor={"#292929"} />
            <Box px={{ base: 4, md: 6 }} >
                <PublicApiKey />
            </Box>
        </>
    );
}

export default PrivacyAndSecurity;