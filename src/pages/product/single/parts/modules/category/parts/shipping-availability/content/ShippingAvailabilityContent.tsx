import { Box, Flex, PopoverBody } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import RegionList from './RegionList'

export default function ShippingAvailabilityContent() {
    const data = [
        {
            region: "East Asia",
            countries: ["China", "Japan", "South Korea", "Taiwan", "Mongolia"]
        },
        {
            region: "Southeast Asia",
            countries: ["Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand", "Vietnam", "Myanmar", "Cambodia", "Laos", "Brunei"]
        },
        {
            region: "South Asia",
            countries: ["India", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives"]
        },
        {
            region: "North America",
            countries: ["United States", "Canada", "Mexico"]
        },
        {
            region: "Europe",
            countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Switzerland", "Sweden", "Norway", "Denmark", "Poland", "Ireland"]
        },
        {
            region: "Oceania",
            countries: ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Samoa"]
        },
        {
            region: "South America",
            countries: ["Brazil", "Argentina", "Chile", "Colombia", "Peru", "Venezuela", "Uruguay", "Paraguay", "Ecuador"]
        },
        {
            region: "Africa",
            countries: ["Nigeria", "South Africa", "Egypt", "Kenya", "Ethiopia", "Ghana", "Morocco", "Uganda", "Tanzania", "Algeria"]
        },
        {
            region: "Middle East",
            countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Jordan", "Lebanon", "Oman", "Bahrain"]
        }
    ]

    return (
        <PopoverBody padding={6}>
            <Box border="1px solid #292929" borderRadius={8}>
                <AppTypography
                    fontSize={16}
                    fontWeight={700}
                    color="#fff"
                    padding="16px 24px"
                    borderBottom="inherit"
                >
                    Available Shipping Regions
                </AppTypography>

                <Flex direction="column" gap={4} padding="32px 24px">
                    {data.map((regionData, index) => <RegionList key={index} regionData={regionData} />)}
                </Flex>
            </Box>
        </PopoverBody>
    )
}