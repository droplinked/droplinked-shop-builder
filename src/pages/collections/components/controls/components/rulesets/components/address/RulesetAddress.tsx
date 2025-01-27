import { HStack, VStack, Box } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import React, { useContext } from 'react';
import ruleModelContext from '../../context';
import { FaPlus } from 'react-icons/fa6';
import Input from 'components/redesign/input/Input';

function RulesetAddress() {
    const { loading, setFieldValue, values, errors } = useContext(ruleModelContext);

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
                            <Input
                                inputProps={{
                                    name: "text",
                                    value: input,
                                    placeholder: `Option ${index + 1}`,
                                    onChange: e => handleInputChange(index, e.target.value),
                                    isRequired: true,
                                    height: "48px"
                                }}
                                label={index === 0 && 'Contract Address'}
                                description={index === 0 && 'Enter the contract addresses to be used for validation of possession or ownership.'}
                            />
                            {values.address.length > 1 && index < values.address.length - 1 && (
                                <Box ml={2} mb={4} cursor={"pointer"} onClick={() => handleDelete(index)}>
                                    <AppIcons.RedTrash />
                                </Box>
                            )}
                            {index === values.address.length - 1 && (
                                <Box ml={2} mb={4} cursor={"pointer"} onClick={addInput}>
                                    <FaPlus color='#2BCFA1' />
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