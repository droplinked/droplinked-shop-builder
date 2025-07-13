import RuledGrid from 'components/redesign/ruled-grid/RuledGrid';
import { ShopSubscriptionData } from 'services/subscription/interfaces';
import * as React from 'react';
import LinearProgressBar from './LinearProgressbar';
import SemiCircleProgressbar from './SemiCircleProgressbar';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface IProps {
    data: ShopSubscriptionData
}

function Charts({ data }: IProps) {
    const { t } = useLocaleResources('subscription');
    const usageKeys = ["physical_product", "digital_product", "print_on_demand", "event"];
    const usageData = data.legalUsage
        .filter(usage => usageKeys.includes(usage.key))
        .sort((a, b) => usageKeys.indexOf(a.key) - usageKeys.indexOf(b.key));
    const otherUsageData = data.legalUsage
        .filter(usage => !usageKeys.includes(usage.key));

    const getTranslationKey = (key: string) => {
        const keyMap: Record<string, string> = {
            'physical_product': 'physicalProduct',
            'digital_product': 'digitalProduct',
            'print_on_demand': 'printOnDemand',
            'event': 'event'
        };
        return `statistics.usage.${keyMap[key] || key}`;
    };

    return (
        <>
            <RuledGrid columns={2} borderRadius={16} mb={4}>
                {usageData.map((usage, index) => (
                    <SemiCircleProgressbar
                        key={index}
                        value={usage.used}
                        maxValue={usage.value}
                        title={t(getTranslationKey(usage.key))}
                    />
                ))}
            </RuledGrid>
            <RuledGrid columns={1} borderRadius={16}>
                {otherUsageData.map((usage, index) => (
                    <LinearProgressBar
                        key={index}
                        value={usage.used}
                        maxValue={usage.value}
                        title={t(getTranslationKey(usage.key))}
                    />
                ))}
                <LinearProgressBar 
                    maxValue={20} 
                    title={t('statistics.usage.cryptoPayment')} 
                    value={10} 
                />
            </RuledGrid>
        </>
    );
}

export default Charts;