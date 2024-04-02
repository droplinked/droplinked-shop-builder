import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import AppErrors from 'lib/utils/statics/errors/errors'
import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { IShopInfoChildProps } from '../../ShopInfo'

function ShopInfoSubmit({ States, updateStates }: IShopInfoChildProps) {
    const { setShopData: { update, loading } } = useProfile()
    const { shopNavigate } = useCustomNavigate();
    const isRegister = useLocation().pathname.includes("register")
    const { showToast } = useAppToast()

    const submit = useCallback(async () => {
        try {
            const { addressBookID, description, tags, pre_purchase_data_fetch } = States
            await update({ addressBookID, description, tags, pre_purchase_data_fetch })
            if (isRegister) {
                shopNavigate(`register/design`);
            } else {
                showToast({ message: AppErrors.store.has_been_updated("Store info"), type: "success" })
            }
        } catch (error) {
            showToast({ message: error?.message, type: "error" })
        }
    }, [States, isRegister])

    const checkDisable = useMemo(() => !States.addressBookID || !States.description, [States])

    return <BasicButton disabled={checkDisable || loading} isLoading={loading} onClick={submit}>{isRegister ? "Next" : "Update"}</BasicButton >
}

export default ShopInfoSubmit