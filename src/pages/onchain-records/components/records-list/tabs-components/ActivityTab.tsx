import { Flex } from "@chakra-ui/react";
import React from "react";
import ContainerCard from "../../ContainerCard";
import DateFormatter from "./DateFormatter";
import ExternalLink from "components/redesign/external-link/ExternalLink";
import { ICombinedNft } from "pages/onchain-records/utils/interface";

export default function ActivityTab({ item }: { item: ICombinedNft }) {
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

    return (
        <Flex flexDirection={"column"} gap={4}>
            <ContainerCard title="Transfer" items={transferData} hasBorder={true} titleRightContent={<DateFormatter date={new Date().toISOString()} />} />
            <ContainerCard title="Creation" items={creationData} hasBorder={true} titleRightContent={<DateFormatter date={new Date().toISOString()} />} />
            <ContainerCard title="Airdrop" items={airdropData} hasBorder={true} titleRightContent={<DateFormatter date={new Date().toISOString()} />} />
        </Flex>
    );
}
