import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'hooks/toast/useToast'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate'
import { useProfile } from 'hooks/useProfile/useProfile'
import AppErrors from 'utils/statics/errors'
import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { IShopInfoChildProps } from '../../ShopInfo'

function ShopInfoSubmit({ States }: IShopInfoChildProps) {
    const { setShopData: { update, loading } } = useProfile()
    const { shopNavigate } = useCustomNavigate();
    const isRegister = useLocation().pathname.includes("register")
    const { showToast } = useAppToast()

    const submit = useCallback(async () => {
        try {
            const { addressBookID, description, tags, pre_purchase_data_fetch, referralDetails } = States
            await update({ addressBookID, description, tags, pre_purchase_data_fetch, referralDetails })
            if (isRegister) {
                shopNavigate(`register/design`);
            } else {
                showToast({ message: AppErrors.store.hasBeenUpdated("Store info"), type: "success" })
            }
        } catch (error) {
            showToast({ message: error?.message, type: "error" })
        }
    }, [States, isRegister])

    return <BasicButton isDisabled={!States.description || loading} isLoading={loading} onClick={submit}>{isRegister ? "Next" : "Update"}</BasicButton >
}

export default ShopInfoSubmit