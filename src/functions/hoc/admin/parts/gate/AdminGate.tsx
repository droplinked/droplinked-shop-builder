import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import DashboardGateModel from './model/DashboardGateModel';

function AdminGate({ children }) {
    const { shop, profile } = useProfile()
    const { checkPermission, registerGate } = DashboardGateModel
    const { shopNavigate } = useCustomNavigate();
    const location = useLocation();

    useEffect(() => {
        if (profile && shop) {
            const check = checkPermission({ user: profile })
            if (check) registerGate({ to: check, redirect: shopNavigate, pathname: location.pathname, user: profile })
        }
    }, [shop, profile, location]);

    return (
        <>
            {shop ? children : <Navigate to={"/"} />}
        </>
    )
}

export default AdminGate