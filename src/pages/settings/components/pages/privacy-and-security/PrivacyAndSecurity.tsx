import { Box, Divider } from '@chakra-ui/react';
import React from "react"
import PrivateKey from './components/private-key/PrivateKey';

function PrivacyAndSecurity() {
    return (
        <>
            <Box px={{ base: 4, md: 6 }} >
                <PrivateKey />
            </Box>
            <Divider borderColor={"#292929"} />
        </>
    );
}

export default PrivacyAndSecurity;