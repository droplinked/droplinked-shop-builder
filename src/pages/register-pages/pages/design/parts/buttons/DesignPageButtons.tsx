import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import React, { useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { designContext, initialStateDesignPage } from '../../design-context'

function DesignPageButtons() {
    const { state: { shop }, methods: { dispatch } } = useContext(designContext)
    const { setShopData: { update, loading }, updateShopData } = useProfile()
    const { showToast } = useAppToast()
    const { shopNavigate } = useCustomNavigate();
    const currentPath = useLocation().pathname;
    const isRegister = currentPath.includes("register")

    const validate = useCallback(() => {
        return new Promise<any>((resolve, reject) => {
            if (!shop.logo.length) reject('Please choose logo')
            else if (!shop.backgroundImage.length) reject('Please choose Hero Image')
            else resolve(true)
        })
    }, [shop])

    const submit = useCallback(async () => {
        try {
            await validate()
            await update(shop)
            updateShopData()
            showToast("Shop update", "success")
        } catch (error) {
            showToast(error, "error");
        }
    }, [shop])

    return (
        <Flex justifyContent="space-between" flexDirection="row-reverse">
            <Flex gap="16px">
                <BasicButton variant='ghost' sizes='large' onClick={() => dispatch({ type: 'updateState', params: { device: initialStateDesignPage.device, shop: initialStateDesignPage.shop } })}>Reset</BasicButton>
                <BasicButton sizes='large' isLoading={loading} onClick={submit}>Next</BasicButton>
            </Flex>
            {isRegister && <BasicButton variant='outline' sizes='large' onClick={() => shopNavigate(`register/technical`)}>back</BasicButton>}
        </Flex>
    )
}

export default DesignPageButtons