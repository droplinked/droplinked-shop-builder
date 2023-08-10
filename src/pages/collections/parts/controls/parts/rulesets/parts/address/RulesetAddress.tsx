import { Box, Flex, HStack, Input, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons';
import ErrorLabel from 'components/common/form/errorLabel/errorLabel';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppSelectBox from 'components/common/form/select/AppSelectBox';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import React, { useCallback, useContext, useRef, useState } from 'react'
import ruleModelContext from '../../context';


function RulesetAddress() {
    const { loading, setFieldValue, values, errors } = useContext(ruleModelContext)
    const [Keywrod, setKeywrod] = useState('')
    const { showToast } = useAppToast()
    const inputRef = useRef<any>()

    const submit = useCallback((e: any) => {
        e.preventDefault()
        if (!Keywrod.length) return false
        const address = values.address
        const keywrod = Keywrod.trim()

        try {
            let error = new Error()
            if (address.find(el => el === keywrod)) {
                error.message = "These identifiers are repeated"
                throw error
            }
            setFieldValue("address", [...address, keywrod])
            setKeywrod("")
        } catch (error) {
            showToast(error.message, "error")
        }
    }, [values, Keywrod])

    const deleted = useCallback((element: any) => {
        setFieldValue("address", values.address.filter(el => el !== element))
    }, [values])

    return (
        <form onSubmit={submit}>
            <VStack align={"stretch"} spacing={1}>
                <VStack align="stretch" spacing={1}>
                    <FieldLabel label='NFT Contract Address' isRequired loading={loading} />
                    <AppTypography size="12px" color="#9C9C9C">Provide NFT contract addresses and separate them with enter. <a style={{ color: "#2EC99E" }} target="_blank">Learn more</a></AppTypography>
                </VStack>
                <AppSkeleton isLoaded={loading} >
                    <Flex backgroundColor="#141414" style={{ cursor: "text", ...errors?.address && { border: "1px solid #FEB2B2" } }} borderRadius="8px" onClick={() => inputRef.current.focus()} flexWrap="wrap" alignItems="center" minHeight="48px" gap={2} padding="17px">
                        {values.address.length ? values.address.map(el => (
                            <HStack backgroundColor="#1c1c1c" padding="4px 10px" borderRadius="4px">
                                <AppTypography size='14px' color="#777">{el}</AppTypography>
                                <AppIcons.Close onClick={() => deleted(el)} cursor="pointer" />
                            </HStack>
                        )) : null}
                        <Input type="text" ref={inputRef} width="200px" value={Keywrod} placeholder="enter..." onChange={e => setKeywrod(e.target.value)} variant="unstyled" color="#777" />
                    </Flex>
                </AppSkeleton>
                <ErrorLabel message={errors?.address} />
            </VStack>
        </form>
    )
}

export default RulesetAddress