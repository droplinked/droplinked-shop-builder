import { GridItem, Text, useMediaQuery } from "@chakra-ui/react"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React from "react"

function EngagementMetrics() {
    const [isMobile] = useMediaQuery("(max-width: 767px)")

    const gridData = [
        { title: "Sessions", amount: 42 },
        { title: "Pages / Session", amount: 3 },
        { title: "Active Time / Session", amount: 42.9 }
    ]

    return (
        <RuledGrid
            columns={isMobile ? 1 : 3}
            borderRadius={16}
        >
            {gridData.map((item, index) => {
                return (
                    <GridItem
                        key={index}
                        display="flex"
                        flexDirection="column"
                        gap={{ base: 1, md: 2 }}
                        padding={{ base: 4, lg: 6 }}
                        color="#FFF"
                    >
                        <Text fontSize={14}>{item.title}</Text>
                        <Text
                            fontSize={{ base: 18, lg: 20 }}
                            fontWeight={500}
                            sx={{ span: { fontWeight: 400 } }}
                        >
                            {item.amount}{" "}
                            {item.title === "Active Time / Session" && (
                                <Text as="span" color="#7B7B7B">
                                    {item.amount === 1 ? "second" : "seconds"}
                                </Text>
                            )}
                        </Text>
                    </GridItem>
                )
            })}
        </RuledGrid>
    )
}

export default EngagementMetrics