import { GridItem, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React from "react"
import EarningsSummary from "./EarningsSummary"
import MetricCard from "./MetricCard"

function Earnings() {
    const metricsData = [
        {
            icon: <AppIcons.HeaderCoins />,
            title: "Net Profit",
            value: 425868.99,
            changePercentage: 23.5,
            progressDirect: 65,
            progressAffiliate: 35,
            directValue: 1245,
            affiliateValue: 1245
        },
        {
            icon: <AppIcons.HeaderCoins />,
            title: "Customers",
            value: 1234,
            changePercentage: 23.5,
            progressDirect: 65,
            progressAffiliate: 35,
            directValue: 34,
            affiliateValue: 1200
        },
        {
            icon: <AppIcons.HeaderCoins />,
            title: "Orders",
            value: 124,
            changePercentage: 23.5,
            progressDirect: 65,
            progressAffiliate: 35,
            directValue: 24,
            affiliateValue: 100
        }
    ]

    return (
        <RuledGrid
            columns={1}
            borderRadius={16}
        >
            {/* Row 1 */}
            <GridItem>
                <EarningsSummary />
            </GridItem>

            {/* Row 2 */}
            <GridItem>
                {/* Your content for Row 2 */}
                <Text>Content for Row 2</Text>
            </GridItem>

            {/* Row 3 */}
            <GridItem>
                <RuledGrid columns={3} nested>
                    {metricsData.map((data, idx) => (
                        <GridItem key={idx}>
                            <MetricCard
                                icon={data.icon}
                                title={data.title}
                                value={data.value}
                                changePercentage={data.changePercentage}
                                progressDirect={data.progressDirect}
                                progressAffiliate={data.progressAffiliate}
                                directValue={data.directValue}
                                affiliateValue={data.affiliateValue}
                            />
                        </GridItem>
                    ))}
                </RuledGrid>
            </GridItem>
        </RuledGrid>
    )
}

export default Earnings