import { Box, Divider } from '@chakra-ui/react';
import React from "react"
import UserManagementSection from './components/user-management/UserManagementSection';
import Referrals from './components/referrals/Referrals';

function UserManagement() {
    return (
        <>
            <Box px={{ base: 4, md: 6 }} >
                <UserManagementSection />
            </Box>
            <Divider borderColor={"#292929"} />
            <Box px={{ base: 4, md: 6 }} >
                <Referrals />
            </Box>
        </>
    );
}

export default UserManagement;