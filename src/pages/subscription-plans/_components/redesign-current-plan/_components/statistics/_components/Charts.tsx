import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces';
import * as React from 'react';
import SemiCircleProgressbar from './SemiCircleProgressbar';
import { Box } from '@chakra-ui/react';
import LinearProgressBar from './LinearProgressbar';
interface IProps {
    data: {
        data: ShopSubscriptionData
    };
}
function Charts({ data }: IProps) {
    const usageKeys = ["physical_product", "digital_product", "print_on_demand", "event"];
    const usageData = data.data.legalUsage
        .filter(usage => usageKeys.includes(usage.key))
        .sort((a, b) => usageKeys.indexOf(a.key) - usageKeys.indexOf(b.key));
    const otherUsageData = data.data.legalUsage
        .filter(usage => !usageKeys.includes(usage.key));

    return (
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={"2rem"} alignItems={"start"}>
            {usageData.map((usage, index) => {
                const title = usage.key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                return (
                    <SemiCircleProgressbar
                        key={index}
                        value={usage.used}
                        maxValue={usage.value}
                        title={title}
                    />
                );
            })}
            {otherUsageData.map((usage, index) => {
                const title = usage.key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                return (
                    <LinearProgressBar
                        key={index}
                        value={usage.used}
                        maxValue={usage.value}
                        title={title}
                    />
                );
            })}
            <LinearProgressBar maxValue={20} title='Crypto Payment' value={10} />
        </Box>
    );
}

export default Charts;