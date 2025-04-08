import { Box, Alert, AlertTitle, AlertDescription } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { Link } from 'react-router-dom';
interface IProps {
    title: string;
}
function UsageExceededAlert({ title }: IProps) {
    const fixedTitle = title.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
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
                        Usage Exceeded
                    </AppTypography>
                </AlertTitle>
                <AlertDescription>
                    <AppTypography fontWeight="400" width={"320px"} fontSize={"14px"} color="neutral.white">
                        All "{fixedTitle}" items have been used. Upgrade the plan to access more.
                    </AppTypography>
                </AlertDescription>
                <Link
                    to="/"
                >
                    <AppTypography
                        color="#FF2244"
                        fontWeight="400"
                        marginTop="5px"
                        textDecoration={"underline"}
                        display="block">
                        Upgrade
                    </AppTypography>
                </Link>
            </Box>
        </Alert>
    );
}

export default UsageExceededAlert;