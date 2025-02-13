import { Flex } from "@chakra-ui/react";
import { AxiosError } from "axios";
import AppTypography from "components/common/typography/AppTypography";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import { getAirdropActivity } from "lib/apis/onchain-inventory/services";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import React from "react";
import { useQuery } from "react-query";
import ContainerCard from "../../ContainerCard";
import ContainerCardSkelton from "../../records-skeleton/ContainerCardSkelton";
import DateFormatter from "./DateFormatter";

export default function ActivityTab({ item }: { item: ICombinedNft }) {
    const { tokenId, tokenAddress, chain } = item ?? {};

    const { isFetching, data, error, isError } = useQuery({
        queryKey: ["records-activity", tokenId],
        enabled: !!tokenId,
        queryFn: () => getAirdropActivity({
            chain,
            tokenAddress,
            tokenId,
        }),
        onError(err: AxiosError<{ data: { message: string } }>) {
            console.log(err)
        },
        retry: false,
    });

    const transferData = [
        {
            title: "Quantity",
            content: "12",
        },
        {
            title: "From",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
        {
            title: "To",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
        {
            title: "Deploy Hash",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
    ];

    const creationData = [
        {
            title: "Creator",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
    ];

    const airdropData = [
        {
            title: "Quantity",
            content: "12",
        },
        {
            title: "ID",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
        {
            title: "Transaction Hash 1",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
        {
            title: "Transaction Hash",
            content: (
                <ExternalLink fontSize={14} fontWeight={500} hasArrow={true}>
                    0x3D56165154
                </ExternalLink>
            ),
        },
    ];

    if (!isFetching && isError) {
        return <AppTypography color={"#fff"} fontSize={16} fontWeight={500} textAlign={"center"}>{error.response.data.data.message ?? "Oops! Something went wrong."}</AppTypography>
    }

    return (
        <Flex flexDirection={"column"} gap={4}>
            {isFetching && <ContainerCardSkelton />}
            {(!isFetching && !isError) && <ContainerCard title="Transfer" items={transferData} hasBorder={true} titleRightContent={<DateFormatter date={new Date().toISOString()} />} />}
        </Flex>
    );
}
