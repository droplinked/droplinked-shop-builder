import { Flex } from "@chakra-ui/react";
import { AxiosError } from "axios";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppTypography from "components/common/typography/AppTypography";
import { getAirdropActivity } from "lib/apis/onchain-inventory/services";
import { ICombinedNft } from "pages/onchain-records/utils/interface";
import React from "react";
import { useQuery } from "react-query";
import ContainerCard from "../../ContainerCard";
import ContainerCardSkelton from "../../records-skeleton/ContainerCardSkelton";
import DateFormatter from "./DateFormatter";
import TransactionLink from './TransactionLink';

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
        retry: false,
    });

    if (!isFetching && isError) {
        return <AppTypography
            color={"#fff"}
            fontSize={16}
            fontWeight={500}
            textAlign={"center"}
        >
            {(error as AxiosError<{ data: { message: string } }>).response?.data.data.message ?? "Oops! Something went wrong."}
        </AppTypography>
    }

    return (
        <Flex flexDirection={"column"} gap={4}>
            {isFetching && <ContainerCardSkelton />}
            {(!isFetching && !isError) &&
                <Flex flexDirection={"column"} gap={4}>
                    {data.data.map((item) => {
                        const transferData = [
                            {
                                title: "Chain",
                                content: <Flex gap={2}>
                                    <BlockchainDisplay
                                        blockchain={item.chain}
                                        show='icon'
                                        props={{ style: { width: "20px", height: "20px" } }}
                                    />
                                    <AppTypography color={"#fff"} fontSize={14}>
                                        <BlockchainDisplay blockchain={item.chain} show='name' />
                                    </AppTypography>
                                </Flex>,
                            },
                            {
                                title: "ID",
                                content: item.id,
                            },
                            {
                                title: "Network",
                                content: item.networkName,
                            },
                            {
                                title: "Status",
                                content: item.status,
                            },
                        ]

                        return (
                            <ContainerCard
                                title="Transfer"
                                items={transferData}
                                hasBorder={true}
                                titleRightContent={<DateFormatter date={item.airdropTimestamp} />}
                            >
                                {item?.transactions && <TransactionLink transactions={item.transactions} chain={chain} />}
                            </ContainerCard>
                        )
                    })}
                </Flex>
            }
        </Flex>
    );
}
