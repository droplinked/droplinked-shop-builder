import { Box, HStack, VStack } from '@chakra-ui/react';
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd';
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppInput from 'components/redesign/input/AppInput';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useContext } from 'react';
import ruleModelContext from '../../context';

function RulesetAddress() {
    const { loading, setFieldValue, values, errors } = useContext(ruleModelContext);
    const { t } = useLocaleResources("collections");

    const addInput = () => {
        setFieldValue("address", [...values.address, '']);
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...values.address];
        newInputs[index] = value;
        setFieldValue("address", newInputs);
    };

    const handleDelete = (index: number) => {
        const newInputs = values.address.filter((_, i) => i !== index);
        setFieldValue("address", newInputs);
    };

    return (
        <VStack align={"stretch"} spacing={1} width={"100%"}>
            <AppSkeleton isLoaded={loading} width={"100%"}>
                <VStack alignItems="center" justifyContent={"center"} width={"100%"} style={{ cursor: "text", ...errors?.address && { border: "1px solid #FF2244", padding: 10 } }} borderRadius="8px">
                    {values.address.map((input, index) => (
                        <HStack gap={0} width={"100%"} key={index} borderRadius="4px" justifyContent="center" alignItems="end">
                            <AppInput
                                inputProps={{
                                    name: "text",
                                    value: input,
                                    placeholder: t("RuleModal.address.optionPlaceholder", { index: index + 1 }),
                                    onChange: e => handleInputChange(index, e.target.value),
                                    isRequired: true,
                                }}
                                label={index === 0 && t("RuleModal.address.label")}
                                description={index === 0 && t("RuleModal.address.description")}
                            />
                            {values.address.length > 1 && index < values.address.length - 1 && (
                                <Box ml={3} mb={4} cursor={"pointer"} onClick={() => handleDelete(index)}>
                                    <TrashMd color='#F24' />
                                </Box>
                            )}
                            {index === values.address.length - 1 && (
                                <Box ml={3} mb={4} marginRight={1} cursor={"pointer"} onClick={addInput}>
                                    <PlusSm color='#2BCFA1' strokeWidth="2px" />
                                </Box>
                            )}
                        </HStack>
                    ))}
                </VStack>
            </AppSkeleton>
        </VStack>
    );
}

export default RulesetAddress;