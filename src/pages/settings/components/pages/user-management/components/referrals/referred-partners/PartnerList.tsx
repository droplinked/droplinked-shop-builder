import { Flex } from '@chakra-ui/react';
import { getReferralReportService } from 'services/shop/shopServices';
import { useHasPermission } from 'stores/app/appStore';
import React from 'react'
import { useQuery } from 'react-query';
import SkeletonLoading from './SkeletonLoading';
import PartnerCard from './PartnerCard';

export interface Partner {
    amount: number,
    _id: string,
    shopName: string,
    code: string,
    customCode: string
}

export default function PartnerList() {
    const hasPermission = useHasPermission()
    const { data, isLoading } = useQuery({ queryKey: 'referral_report', queryFn: getReferralReportService, cacheTime: 1, enabled: hasPermission("create_referral_code") });
    const reportData = data?.data?.data ?? []

    return (
        <Flex width={"100%"}>
            {isLoading ?
                <SkeletonLoading />
                :
                <Flex width={"100%"} gap={4} flexDirection={"column"}>
                    {reportData.map((item: Partner) => {
                        return (
                            <PartnerCard partner={item} key={item._id} />
                        )
                    })}
                </Flex>
            }
        </Flex>
    )
}
