import React from "react";
import { Outlet } from "react-router";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import ProducerLayout from "./ProducerLayout/ProducerLayout";

export default function AuthGuardProducerLayout() {
    return (
        <AuthGuard>
            <ProducerLayout>
                <Outlet />
            </ProducerLayout>
        </AuthGuard>
    );
}
