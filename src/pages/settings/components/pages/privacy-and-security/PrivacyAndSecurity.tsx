import { Divider } from '@chakra-ui/react';
import React from "react"
import PrivateKey from './components/private-key/PrivateKey';
import PublicApiKey from './components/public-api-key/PublicApiKey';

function PrivacyAndSecurity() {
    return (
        <>
            <PrivateKey />
            <Divider borderColor={"neutral.gray.800"} />
            <PublicApiKey />
        </>
    );
}

export default PrivacyAndSecurity;