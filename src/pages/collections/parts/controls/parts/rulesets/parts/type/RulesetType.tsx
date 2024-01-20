import { Box, Checkbox, Text, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext } from 'react'
import ruleModelContext from '../../context'
import { RuleTypes } from '../../RuleModel'
import TextboxRule from '../textbox/TextboxRule'

function RulesetType() {
    const { values, setFieldValue, loading } = useContext(ruleModelContext)

    return (
        <AppSkeleton isLoaded={loading}>
            <VStack align="stretch" spacing={5}>
                <Checkbox onChange={e => setFieldValue("rule", e.target.checked ? "DISCOUNT" : "GATED")} size='md' alignItems="flex-start" colorScheme='green' isChecked={values.rule === "DISCOUNT"}>
                    <VStack align='stretch' paddingLeft={2} spacing={2}>
                        <TextLabelBold>Discount</TextLabelBold>
                        <Text fontSize="sm" color="lightGray">Set an exclusive discount offer for the NFT holders</Text>
                    </VStack>
                </Checkbox>
                {values.rule === RuleTypes.DISCOUNT && (
                    <Box width={"100%"}>
                        <TextboxRule element={"discount"} onChange={e => setFieldValue('discount', parseInt(e.target.value))} placeholder="20%" label="Discount Value" />
                    </Box>
                )}
            </VStack>
        </AppSkeleton>
    )
}

export default RulesetType