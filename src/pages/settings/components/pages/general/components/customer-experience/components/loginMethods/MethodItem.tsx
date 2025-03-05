import { Box, Flex } from "@chakra-ui/react";
import BlockchainDisplay from "components/common/blockchainDisplay/BlockchainDisplay";
import AppTypography from "components/common/typography/AppTypography";
import SwitchBox from "components/redesign/switch-box/SwitchBox";
import { useFormikContext } from "formik";
import { ISettings } from "pages/settings/formConfigs";
import React, { ChangeEvent } from "react";

interface Props {
    method: {
        name: string;
        isActivated: boolean;
        type: "SOCIAL" | "WALLET";
    };
}

export default function MethodItem({ method }: Props) {
    const { values, setFieldValue } = useFormikContext<ISettings>();

    const onToggle = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        const isChecked = e.target.checked;
        const updatedMethods = isChecked
            ? [...values.loginMethods, { ...method, isActivated: true }]
            : values.loginMethods.filter((method) => method.name !== name);

        setFieldValue('loginMethods', updatedMethods);
    };

    return (
        <Flex
            borderRadius={"8px"}
            border={"1px solid"}
            borderColor="neutral.gray.800"
            width="100%"
            flexWrap={"wrap"}
            p={4}
            justifyContent={"space-between"}
            flexDirection={"row"}
            alignItems={"center"}
        >
            <Flex gap={4} flex={1} alignItems={"center"}>
                <Box
                    p={3}
                    background={"neutral.gray.1000"}
                    border={"1px solid"}
                    borderColor="neutral.gray.800"
                    borderRadius={"8px"}
                >
                    <BlockchainDisplay
                        blockchain={method.name.toUpperCase()}
                        show="icon"
                        key={method.name}
                    />
                </Box>
                <AppTypography fontSize={16} fontWeight={"500"} color={"#fff"}>
                    {method.name}
                </AppTypography>
            </Flex>
            <Box>
                <SwitchBox
                    isChecked={!!values.loginMethods.find(item => item.name === method.name)}
                    isDisabled={!method.isActivated}
                    onToggle={(e) => onToggle(e, method.name)}
                />
            </Box>
        </Flex>
    );
}
