import BasicButton from 'components/shared/BasicButton/BasicButton'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate'
import { useProfile } from 'hooks/useProfile/useProfile'
import useAppStore from 'lib/stores/app/appStore'
import AppErrors from 'lib/utils/statics/errors/errors'
import React, { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useStore } from 'zustand'
import { IstatesShopInfo } from '../../ShopInfo'

interface IProps {
    States: IstatesShopInfo
}

function ShopInfoSubmit({ States }: IProps) {
    const { setShopData: { update, loading } } = useProfile()
    const { shopNavigate } = useCustomNavigate();
    const isRegister = useLocation().pathname.includes("register")

    const submit = useCallback(async () => {
        try {
            const { addressBookID, description } = States
            await update({ addressBookID, description })
            if (isRegister) {
                shopNavigate(`register/design`);
            } else {
                toast.success(AppErrors.store.has_been_updated("Store info"))
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }, [States, isRegister])

    const checkDisable = useMemo(() => !States.addressBookID || !States.description, [States])

    return <BasicButton disabled={checkDisable || loading} isLoading={loading} onClick={submit}>{isRegister ? "Next" : "Update"}</BasicButton >
}

export default ShopInfoSubmit