import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppButton from 'components/redesign/button/AppButton'
import AppSelect from 'components/redesign/select/AppSelect'
import useDownloadFile from 'hooks/useDownloadFile/useDownloadFile'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import { exportCouponsReport } from 'services/coupons/addressServices'
import { Coupon } from '../../../interface'
import CodesList from './CodesList'

export enum Filters {
    All = 'All',
    Used = 'Used',
    Available = 'Available'
}

interface Props {
    coupon: Coupon
    onClose: () => void
}

export default function CodesTab({ coupon, onClose }: Props) {
    const { t } = useLocaleResources('settings');
    const [currentFilter, setCurrentFilter] = useState(Filters.All)
    const { download, isLoading } = useDownloadFile({
        fetcher: exportCouponsReport,
        fileNameResolver: () => `${Date.now()}.xlsx`,
        onSuccess: () => onClose(),
        onError: () => onClose()
    })

    return (
        <Flex gap={4} flexDirection='column'>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box width='150px'>
                    <AppSelect
                        items={[
                            {
                                label: t("Coupons.information.filters.all"),
                                value: Filters.All
                            },
                            {
                                label: t("Coupons.information.filters.used"),
                                value: Filters.Used
                            },
                            {
                                label: t("Coupons.information.filters.available"),
                                value: Filters.Available
                            }
                        ]}
                        labelAccessor='label'
                        valueAccessor='value'
                        selectProps={{
                            value: currentFilter,
                            onChange: e => setCurrentFilter(e.target.value as Filters)
                        }}
                    />
                </Box>
                <AppButton
                    variant='secondary'
                    onClick={() => download({ giftCardId: coupon._id })}
                    isLoading={isLoading}
                    leftIcon={<AppIcons.Download />}
                >
                    {t("Coupons.information.download")}
                </AppButton>
            </Flex >
            <CodesList codes={coupon.codes} currentFilter={currentFilter} />
        </Flex >
    )
}