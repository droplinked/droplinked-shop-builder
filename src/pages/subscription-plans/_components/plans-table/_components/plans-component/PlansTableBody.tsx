import { Box, Tbody, Td, Tr } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import * as React from 'react';

function PlansTableBody({ data }: { data: Array<SubscriptionPlan> }) {
    const renderValue = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? <AppIcons.AvailableFilled /> : <AppIcons.NotAvailableFilled />;
        }
        return <AppTypography fontSize={"16px"} color={"#fff"}>{value}</AppTypography>;
    };
    return (
        <Tbody>
            {data[0].subOptionIds.map((option, index) => (
                <React.Fragment key={index}>
                    <Tr>
                        <Td borderColor={"#ffffff2e"} px={0} colSpan={data.length + 1} border={"none"}>
                            <AppTypography marginTop={"1rem"} color={"#2BCFA1"} fontWeight={"700"} fontSize={"20px"}>{option?.title || option?.key}</AppTypography>
                        </Td>
                    </Tr>
                    {option.value.map((subOption, subIndex) => (
                        <Tr height={"64px"} key={subIndex}>
                            <Td borderColor={"#ffffff2e"} maxWidth={"15rem"} style={{ textWrap: "wrap" }} px={0}><AppTypography color={"#fff"} fontSize={"16px"}>{subOption.title}</AppTypography></Td>
                            {data.map((plan, planIndex) => (
                                <Td borderColor={"#ffffff2e"} key={planIndex}>
                                    <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                        {renderValue(plan.subOptionIds[index].value[subIndex].value)}
                                    </Box>
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </React.Fragment>
            ))}
        </Tbody>
    );
}

export default PlansTableBody;