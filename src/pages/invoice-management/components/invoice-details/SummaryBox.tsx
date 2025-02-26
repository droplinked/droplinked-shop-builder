import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';
import { SummaryRow } from 'pages/invoice-management/hooks/useInvoiceInformation';
import React from 'react';

interface Props {
    title: string;
    rows: SummaryRow[];
}

function SummaryBox({ title, rows }: Props) {
    const { convertPrice, abbreviation, symbol } = useCurrencyConverter();

    const renderValue = (row: SummaryRow) => {
        if (typeof row.value === "number" && row.isPrice)
            return (
                <AppTypography as={"dd"} fontWeight={500}>
                    {symbol}{convertPrice({ amount: row.value, toFixed: true })} {" "}
                    <Box as='span' color='#878787'>{abbreviation}</Box>
                </AppTypography>
            )
        return <AppTypography as={"dd"} fontWeight={500}>{row.value}</AppTypography>
    }

    return (
        <Flex
            direction={"column"}
            border={"1px solid #292929"}
            borderRadius={8}
            padding={6}
        >
            <AppTypography fontSize={16} fontWeight={700} color={"white"}>{title}</AppTypography>
            <Flex as={"dl"} mt={6} direction={"column"} gap={4}>
                {rows.map((row: SummaryRow, index: number) => (
                    <Flex
                        key={index}
                        justifyContent={"space-between"}
                        gap={6}
                        sx={{ "dt , dd": { fontSize: 14, color: "white" } }}
                    >
                        <AppTypography as={"dt"} fontWeight={400}>{row.label}</AppTypography>
                        {renderValue(row)}
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}

export default SummaryBox