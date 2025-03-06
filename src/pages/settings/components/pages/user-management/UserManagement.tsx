import { Divider } from '@chakra-ui/react';
import React from "react"
import UserManagementSection from './components/user-management/UserManagementSection';
import Referrals from './components/referrals/Referrals';

function UserManagement() {
    return (
        <>
            <UserManagementSection />
            <Divider borderColor={"neutral.gray.800"} />
            <Referrals />
        </>
    );
}

export default UserManagement;