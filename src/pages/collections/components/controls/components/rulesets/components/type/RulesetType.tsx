import { Box, HStack, Switch, Text, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React, { useContext, useEffect } from 'react'
import ruleModelContext from '../../context'
import { RuleTypes } from '../../RuleModel'
import TextboxRule from '../textbox/TextboxRule'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function RulesetType() {
    const { values, setFieldValue, loading } = useContext(ruleModelContext)
    const { t } = useLocaleResources("collections");
    
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
                    <Text fontWeight="bold" fontSize="14px" color="#FFFFFF">{t("RuleModal.discount")}</Text>
                    <Text fontSize="14px" color="text.subtext.placeholder.dark">{t("RuleModal.discountDescription")}</Text>
                </VStack>
                {values.type === RuleTypes.DISCOUNT && (
                    <Box width={"20%"}>
                        <TextboxRule isRequired={false} element={"discountPercentage"} onChange={e => setFieldValue('discountPercentage', parseInt(e.target.value))} placeholder={t("RuleModal.discountPlaceholder")} />
                    </Box>
                )}
            </HStack>
        </AppSkeleton>
    )
}

export default RulesetType