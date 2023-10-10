import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import AppErrors from 'lib/utils/statics/errors/errors'
import React, { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { IstatesShopInfo } from '../../ShopInfo'

interface IProps {
    States: IstatesShopInfo
}

function ShopInfoSubmit({ States }: IProps) {
    const { setShopData: { update, loading } } = useProfile()
    const { shopNavigate } = useCustomNavigate();
    const isRegister = useLocation().pathname.includes("register")
    const { showToast } = useAppToast()

    const submit = useCallback(async () => {
        try {
            const { addressBookID, description, tags } = States
            await update({ addressBookID, description, tags })
            if (isRegister) {
                shopNavigate(`register/design`);
            } else {
                showToast(AppErrors.store.has_been_updated("Store info"), "success")
            }
        } catch (error) {
            showToast(error?.message, "error")
        }
    }, [States, isRegister])

    const checkDisable = useMemo(() => !States.addressBookID || !States.description, [States])

    return <BasicButton disabled={checkDisable || loading} isLoading={loading} onClick={submit}>{isRegister ? "Next" : "Update"}</BasicButton >
}

export default ShopInfoSubmit