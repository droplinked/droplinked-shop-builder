import { Divider, Flex } from '@chakra-ui/react';
import AppCard from 'components/common/card/AppCard';
import AppTypography from 'components/common/typography/AppTypography';
import { getInvitationsService } from 'lib/apis/user/services';
import React from 'react';
import { useQuery } from 'react-query';
import InvitationForm from './parts/form/InvitationForm';
import UserList from './parts/list/UserList';

function Admins() {
    const { isFetching, data, refetch } = useQuery({ queryFn: () => getInvitationsService(), refetchOnWindowFocus: false })

    return (
        <AppCard>
            <Flex direction={"column"} gap={9}>
                <Flex direction={"column"} gap={6}>
                    <Flex direction={"column"} gap={2}>
                        <AppTypography fontSize={18} fontWeight='bold'>User Management</AppTypography>
                        <AppTypography fontSize={16}>Use your unique Private Key for specialized services in Shop Builder. You should keep this key confidential and exposing it will compromise the security of your services.</AppTypography>
                    </Flex>
                    <InvitationForm fetch={refetch} />
                </Flex>
                <Divider margin={0} borderColor={"#262626"} />
                <UserList users={data?.data || []} isLoading={isFetching} />
            </Flex>
        </AppCard>
    )
}

export default Admins