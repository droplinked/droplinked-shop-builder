import { HStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import CopyrightItem from './components/CopyrightItem';
import DotSpacer from './components/DotsSpacer';

function Copyright() {
    return (
        <HStack
            flexDirection={{ sm: "column", md: "row" }}
            justifyContent={"space-between"}
            background={"#292929"}
            py={"22px"}
            px={{
                sm: "1rem", md: "6rem"
            }}>
            <AppTypography color={"#B1B1B1"} fontWeight={"400"} fontSize={"14px"}>© 2024 All Rights Reserved</AppTypography>
            <HStack alignItems={"center"}>
                <CopyrightItem href='/privacy' title='Privacy & Data Collection' />
                <DotSpacer />
                <CopyrightItem href='/terms' title='Terms of service' />
            </HStack>
        </HStack >
    );
}

export default Copyright;