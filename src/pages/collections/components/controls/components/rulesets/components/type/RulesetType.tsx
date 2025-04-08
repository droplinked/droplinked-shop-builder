import { Box, HStack, Switch, Text, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext, useEffect } from 'react'
import ruleModelContext from '../../context'
import { RuleTypes } from '../../RuleModel'
import TextboxRule from '../textbox/TextboxRule'

function RulesetType() {
    const { values, setFieldValue, loading } = useContext(ruleModelContext)
    useEffect(() => {
        if (values.type !== RuleTypes.DISCOUNT) {
            setFieldValue('discountPercentage', 0)
        }
    }, [values.type])
    return (
        <AppSkeleton isLoaded={loading}>
            <HStack align="stretch" spacing={2}>
                <Switch onChange={e => setFieldValue("type", e.target.checked ? "DISCOUNT" : "GATING")} size='md' colorScheme='green' isChecked={values.type === "DISCOUNT"} />
                <VStack align='stretch' paddingLeft={2} spacing={2}>
                    <TextLabelBold>Discount</TextLabelBold>
                    <Text fontSize="14px" color="text.subtextPlaceholder.dark">Enable this function to offer an exclusive discount to holders that meet the requirements.</Text>
                </VStack>
                {values.type === RuleTypes.DISCOUNT && (
                    <Box width={"20%"}>
                        <TextboxRule isRequired={false} element={"discountPercentage"} onChange={e => setFieldValue('discountPercentage', parseInt(e.target.value))} placeholder="20%" />
                    </Box>
                )}
            </HStack>
        </AppSkeleton>
    )
}

export default RulesetType