import RuledGrid from 'components/redesign/ruled-grid/RuledGrid';
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces';
import * as React from 'react';
import LinearProgressBar from './LinearProgressbar';
import SemiCircleProgressbar from './SemiCircleProgressbar';
interface IProps {
    data: ShopSubscriptionData
}
function Charts({ data }: IProps) {
    const usageKeys = ["physical_product", "digital_product", "print_on_demand", "event"];
    const usageData = data.legalUsage
        .filter(usage => usageKeys.includes(usage.key))
        .sort((a, b) => usageKeys.indexOf(a.key) - usageKeys.indexOf(b.key));
    const otherUsageData = data.legalUsage
        .filter(usage => !usageKeys.includes(usage.key));

    return (
        <>
            <RuledGrid columns={2} borderRadius={16} mb={4}>
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
            </RuledGrid>
            <RuledGrid columns={1} borderRadius={16}>
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
            </RuledGrid>
        </>
    );
}

export default Charts;