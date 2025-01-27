import { Box, Divider } from '@chakra-ui/react';
import React from "react"
import Credits from './components/credits/Credits';
import Coupons from './components/coupons/Coupons';

function CreditAndCoupons() {
    return (
        <>
            <Box px={{ base: 4, md: 6 }} >
                <Credits />
            </Box>
            <Divider borderColor={"#292929"} />
            <Box px={{ base: 4, md: 6 }} >
                <Coupons />
            </Box>
        </>
    );
}

export default CreditAndCoupons;