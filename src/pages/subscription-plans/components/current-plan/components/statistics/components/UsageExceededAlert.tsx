import { Box, Alert, AlertTitle, AlertDescription } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    title: string;
}

function UsageExceededAlert({ title }: IProps) {
    const { t } = useLocaleResources('subscription');
    const fixedTitle = t(`statistics.usage.${title.replace(/_/g, '').toLowerCase()}`);

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
                        {t('statistics.alert.title')}
                    </AppTypography>
                </AlertTitle>
                <AlertDescription>
                    <AppTypography fontWeight="400" width={"320px"} fontSize={"14px"} color="neutral.white">
                        {t('statistics.alert.description', { feature: fixedTitle })}
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
                        {t('statistics.alert.upgrade')}
                    </AppTypography>
                </Link>
            </Box>
        </Alert>
    );
}

export default UsageExceededAlert;