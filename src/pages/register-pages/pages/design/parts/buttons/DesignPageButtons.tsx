import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import React, { useCallback, useContext } from 'react'
import { designContext } from '../../design-context'

function DesignPageButtons() {
    const { state: { shop } } = useContext(designContext)
    const { setShopData: { update, loading }, updateShopData } = useProfile()
    const {showToast} = useAppToast()

    const submit = useCallback(async () => {
        try {
            await update(shop)
            updateShopData()
            showToast("Shop update", "success")
        } catch (error) {
            console.log(error);

        }
    }, [shop])

    return (
        <Flex justifyContent="space-between">
            <BasicButton variant='outline' sizes='large'>back</BasicButton>
            <Flex gap="16px">
                <BasicButton variant='ghost' sizes='large'>Reset</BasicButton>
                <BasicButton sizes='large' isLoading={loading} onClick={submit}>Next</BasicButton>
            </Flex>
        </Flex>
    )
}

export default DesignPageButtons