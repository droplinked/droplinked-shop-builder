import { Box, Alert, AlertTitle, AlertDescription } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';
import { Link } from 'react-router-dom';
import localEn from 'locales/subscription/en.json';
import localAr from 'locales/subscription/ar.json';

interface IProps {
    title: string;
}

function UsageExceededAlert({ title }: IProps) {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });
    
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
        <Alert
            status="error"
            backgroundColor="#FF22440D"
            border="1px solid #FF2244"
            borderRadius="8px"
            justifyContent={"start"}
            alignItems={"start"}
            gap={"1rem"}
        >
            <AppIcons.RedAlert />
            <Box flex="1">
                <AlertTitle color="white" fontSize="14px" fontWeight="700">
                    <AppTypography fontWeight={700} fontSize={"14px"}>
                        {t('UsageExceededAlert.title')}
                    </AppTypography>
                </AlertTitle>
                <AlertDescription>
                    <AppTypography fontWeight="400" width={"320px"} fontSize={"14px"} color="neutral.white">
                        {t('UsageExceededAlert.description', { feature: getTitle(title) })}
                    </AppTypography>
                </AlertDescription>
                <Link to="/">
                    <AppTypography
                        color="#FF2244"
                        fontWeight="400"
                        marginTop="5px"
                        textDecoration={"underline"}
                        display="block"
                    >
                        {t('UsageExceededAlert.upgrade')}
                    </AppTypography>
                </Link>
            </Box>
        </Alert>
    );
}

export default UsageExceededAlert;