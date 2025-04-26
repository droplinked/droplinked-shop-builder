import React, { useState } from 'react'
import { Coupon } from '../../../interface'
import { Box, Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppIcons from 'assets/icon/Appicons'
import { useMutation } from 'react-query'
import { exportCouponsReport } from 'lib/apis/coupons/addressServices'
import { AxiosError } from 'axios'
import useAppToast from 'hooks/toast/useToast'
import CodesList from './CodesList'
import Select from 'components/redesign/select/Select'

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
    const [currentFilter, setCurrentFilter] = useState(Filters.All)
    const { showToast } = useAppToast();
    const { mutate, isLoading } = useMutation(
        () => exportCouponsReport({ giftCardId: coupon._id }),
        {
            onSuccess: (data) => {
                const url = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${Date.now()}.xlsx`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                }, 100);
                onClose()
            },
            onError: (error: AxiosError) => {
                showToast({ message: error.message, type: "error" });
                onClose()
            }
        }
    );

    return (
        <Flex gap={4} flexDirection={"column"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Box width={"150px"}>
                    <Select
                        items={[
                            {
                                label: Filters.All,
                                value: Filters.All
                            },
                            {
                                label: Filters.Used,
                                value: Filters.Used
                            },
                            {
                                label: Filters.Available,
                                value: Filters.Available
                            }
                        ]}
                        labelAccessor='label'
                        valueAccessor='value'
                        selectProps={{ value: currentFilter, onChange: (e) => setCurrentFilter(e.target.value as Filters) }}
                    />
                </Box>
                {/* TODO: Check with the design */}
                <AppButton 
                    variant='secondary' 
                    onClick={() => mutate()} 
                    isLoading={isLoading} 
                    leftIcon={<AppIcons.Download />}
                >
                    Download
                </AppButton>
            </Flex>
            <CodesList codes={coupon.codes} currentFilter={currentFilter} />
        </Flex>
    )
}
