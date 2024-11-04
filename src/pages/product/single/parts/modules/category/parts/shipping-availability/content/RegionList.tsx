import { Circle, Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React from 'react';

export default function RegionList({ regionData }) {
    return (
        <Flex direction="column" gap="2px">
            <AppTypography fontSize={16} fontWeight={500} color="#fff">
                {regionData.region}
            </AppTypography>
            <Flex flexWrap="wrap" alignItems="center" gap={3}>
                {regionData.countries.map((country, index) =>
                    <CountryItem key={index} country={country} index={index} />
                )}
            </Flex>
        </Flex>
    )
}

function CountryItem({ country, index }) {
    return (
        <Flex alignItems="center" gap={3}>
            {index !== 0 && <Circle size={1} bgColor="#3C3C3C" />}
            <AppTypography fontSize={16} color="#B1B1B1">{country}</AppTypography>
        </Flex>
    )
}