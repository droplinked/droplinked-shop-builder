import { HStack, VStack, Box } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import ErrorLabel from 'components/redesign/form/errorLabel/errorLabel';
import FieldLabel from 'components/redesign/form/fieldLabel/FieldLabel';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useContext } from 'react';
import ruleModelContext from '../../context';
import AppInput from 'components/redesign/form/textbox/AppInput';
import { FaPlus } from 'react-icons/fa6';

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
            <VStack align="stretch" spacing={1}>
                <FieldLabel label='Contract Address' isRequired loading={loading} />
                <AppTypography fontSize="14px" color="#7b7b7b">Enter the contract addresses to be used for validation of possession or ownership.</AppTypography>
            </VStack>
            <AppSkeleton isLoaded={loading} width={"100%"}>
                <VStack alignItems="center" justifyContent={"center"} width={"100%"} style={{ cursor: "text", ...errors?.address && { border: "1px solid #FF2244" } }} borderRadius="8px">
                    {values.address.map((input, index) => (
                        <HStack gap={0} width={"100%"} key={index} borderRadius="4px" justifyContent={"center"} alignItems="center">
                            <AppInput
                                name={"text"}
                                width="100%"
                                height="48px"
                                value={input}
                                placeholder={`Option ${index + 1}`}
                                onChange={e => handleInputChange(index, e.target.value)}
                                variant="unstyled"
                                color="#777"
                            />
                            {values.address.length > 1 && index < values.address.length - 1 && (
                                <Box cursor={"pointer"} mt={"1rem"} onClick={() => handleDelete(index)}>
                                    <AppIcons.TrashRed />
                                </Box>
                            )}
                            {index === values.address.length - 1 && (
                                <Box cursor={"pointer"} mt={"1rem"} onClick={addInput}>
                                    <FaPlus color='#2BCFA1' />
                                </Box>
                            )}
                        </HStack>
                    ))}
                </VStack>
            </AppSkeleton>
            <ErrorLabel message={errors?.address} />
        </VStack>
    );
}

export default RulesetAddress;