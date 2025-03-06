import { Divider } from '@chakra-ui/react';
import React from "react"
import Credits from './components/credits/Credits';
import Coupons from './components/coupons/Coupons';

function CreditAndCoupons() {
    return (
        <>
            <Credits />
            <Divider borderColor={"neutral.gray.800"} />
            <Coupons />
        </>
    );
}

export default CreditAndCoupons;