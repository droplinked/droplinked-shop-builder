import RuledGrid from 'components/redesign/ruled-grid/RuledGrid';
import { ShopSubscriptionData } from 'services/subscription/interfaces';
import * as React from 'react';
import LinearProgressBar from './LinearProgressbar';
import SemiCircleProgressbar from './SemiCircleProgressbar';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/subscription/en.json';
import localAr from 'locales/subscription/ar.json';

interface IProps {
    data: ShopSubscriptionData
}

function Charts({ data }: IProps) {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });
    
    const usageKeys = ["physical_product", "digital_product", "print_on_demand", "event"];
    const usageData = data.legalUsage
        .filter(usage => usageKeys.includes(usage.key))
        .sort((a, b) => usageKeys.indexOf(a.key) - usageKeys.indexOf(b.key));
    const otherUsageData = data.legalUsage
        .filter(usage => !usageKeys.includes(usage.key));

    const getTitle = (key: string) => {
        // Map usage keys to translation keys
        const keyMap: { [key: string]: string } = {
            'physical_product': 'statistics.usage.physicalProduct',
            'digital_product': 'statistics.usage.digitalProduct',
            'print_on_demand': 'statistics.usage.printOnDemand',
            'event': 'statistics.usage.event',
            'web3_network_login': 'Charts.web3_network_login',
            'web3_payment': 'Charts.web3_payment',
            'ai_shop_builder': 'Charts.ai_shop_builder',
            'shop_data_export_url': 'Charts.shop_data_export_url',
            'drop': 'Charts.drop'
        };
        
        return t(keyMap[key] || key);
    };

    return (
        <>
            <RuledGrid columns={2} borderRadius={16} mb={4}>
                {usageData.map((usage, index) => {
                    return (
                        <SemiCircleProgressbar
                            key={index}
                            value={usage.used}
                            maxValue={usage.value}
                            title={getTitle(usage.key)}
                        />
                    );
                })}
            </RuledGrid>
            <RuledGrid columns={1} borderRadius={16}>
                {otherUsageData.map((usage, index) => {
                    return (
                        <LinearProgressBar
                            key={index}
                            value={usage.used}
                            maxValue={usage.value}
                            title={getTitle(usage.key)}
                        />
                    );
                })}
                <LinearProgressBar maxValue={20} title={t('Charts.cryptoPayment')} value={10} />
            </RuledGrid>
        </>
    );
}

export default Charts;