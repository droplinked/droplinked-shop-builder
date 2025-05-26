import { Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react'
import { formatDateToLongStyle, formattedTime } from 'utils/helpers';

interface DateCellProps {
    date: Date | string | null;
}

/**
 * Displays a date in a standardized format with date and time
 */
export default function DateCell({ date }: DateCellProps) {
    const { t } = useLocaleResources("purchaseHistory")

    if (!date) {
        return <Text fontSize={14} color="#7B7B7B">{t("not_available")}</Text>;
    }

    return (
        <DotSeparatedList gap={4}>
            <Text fontSize={14} color="#fff">{formatDateToLongStyle(new Date(date))}</Text>
            <Text fontSize={14} color="#fff">{formattedTime(date)}</Text>
        </DotSeparatedList>
    )
}
