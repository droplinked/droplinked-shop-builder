import { Divider, Flex, ModalBody, ModalFooter } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import { IchargeCreditService } from 'services/shop/interfaces'
import { chargeCreditService } from 'services/shop/shopServices'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Props {
    handleSetPayment: (clientSecret: string | null, amount: number) => void;
    onClose: () => void;
}

export default function BalanceModalBody({ handleSetPayment, onClose }: Props) {
    const [value, setValue] = useState(null)
    const { mutateAsync, isLoading } = useMutation((params: IchargeCreditService) => chargeCreditService(params))
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("common")
    const { convertPrice } = useCurrencyConverter()

    const onSubmit = async () => {
        const amount = Math.floor(convertPrice({ amount: value, toUSD: true }))
        try {
            const query = await mutateAsync({ amount })
            handleSetPayment(query.data.data.clientSecret, amount)
        } catch (error) {
            showToast({ message: error?.message || t("BalanceModalBody.genericError"), type: 'error' })
        }
    }

    return (
        <Flex flexDir={"column"} gap={"36px"} pt={"48px"}>
            <ModalBody>
                <AppInput
                    label={t("BalanceModalBody.amount")}
                    inputProps={{
                        isRequired: true,
                        placeholder: t("BalanceModalBody.placeholder"),
                        value: value,
                        type: "number",
                        onChange: (e) => setValue(e.target.value)
                    }}
                    leftElement={<CurrencyIcon />}
                />
            </ModalBody>
            <Divider borderColor={"neutral.gray.800"} />
            <ModalFooter display={"flex"} justifyContent={"space-between"}>
                <AppButton onClick={onClose} variant='secondary'>{t("common:cancel")}</AppButton>
                <AppButton onClick={onSubmit} isLoading={isLoading} isDisabled={!value}>{t("BalanceModalBody.pay")}</AppButton>
            </ModalFooter>
        </Flex>
    )
}
