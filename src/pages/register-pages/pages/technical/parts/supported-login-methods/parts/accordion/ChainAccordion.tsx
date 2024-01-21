import { Flex } from '@chakra-ui/layout';
import AppIcons from 'assest/icon/Appicons';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppSwitch from 'components/common/swich';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useState } from 'react';

interface Props {
    label: string,
}

function ChainAccordion({ label }: Props) {
    const [isExpanded, setExpanded] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const ChainIcon = <BlockchainDisplay blockchain={label} show="icon" props={{ width: "24px", height: "24px" }} />
    const wallets = ["0x1", "0x2", "0x3", "0x4", "0x5"];

    return (
        <Flex
            direction={"column"}
            gap={"24px"}
            borderRadius={"8px"}
            padding={"24px"}
            backgroundColor={"#141414"}
        >
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                onClick={() => setExpanded(!isExpanded)} style={{ cursor: "pointer" }}
            >
                <Flex alignItems={"center"} gap={"16px"}>
                    {ChainIcon}
                    <AppTypography fontSize={"14px"} fontWeight={"bold"} color={"#C2C2C2"}>{label}</AppTypography>
                </Flex>
                <AppIcons.ArrowDown style={{ transition: ".3s", ...isExpanded && { transform: "rotate(180deg)" } }} />
            </Flex>

            {isExpanded &&
                wallets.map((wallet, index) =>
                    <Flex
                        key={index}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Flex alignItems={"center"} gap={"8px"}>
                            {ChainIcon}
                            <AppTypography color={"#C2C2C2"}>{wallet}</AppTypography>
                        </Flex>
                        <AppSwitch onChange={(e) => setChecked(e.target.checked)} isChecked={isChecked} />
                    </Flex>
                )
            }
        </Flex>
    )
}

export default ChainAccordion