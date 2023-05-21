import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'hooks/useProfile/useProfile';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import DashboardGateModel from './model/DashboardGateModel';

function AdminGate({ children }) {
    const { shop, profile } = useProfile()
    const { checkPermission, registerGate } = DashboardGateModel
    const { shopNavigate } = useCustomNavigate();
    const location = useLocation();

    useEffect(() => {
        if (profile && shop) {
            const check = checkPermission({ shop })
            if (check) registerGate({ to: check, redirect: shopNavigate, pathname: location.pathname, shop })
        }
    }, [shop, profile, location]);

    return (
        <>
            {shop ? children : "login"}
        </>
    )
}

export default AdminGate