import { Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppCard from 'components/common/card/AppCard';
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { getInvitationsService, sendInvitaionEmailService } from 'lib/apis/user/services';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import UserList from './parts/UserList';

function Admins() {
    const [newUser, setNewUser] = useState("")
    const sendInvitationEmail = useMutation((email: string) => sendInvitaionEmailService(email))
    const fetchInvitations = useQuery({ queryFn: () => getInvitationsService() })
    const { showToast } = useAppToast()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewUser(e.target.value)

    const handleSendingInvitationEmail = async () => {
        try {
            await sendInvitationEmail.mutateAsync(newUser)
            showToast({ type: "success", message: "An invitation has been sent to this email." })
            setNewUser("")
            fetchInvitations.refetch()
        }
        catch (e) {
            showToast({ type: "error", message: (e as Error).message })
        }
    }

    return (
        <AppCard>
            <Flex direction={"column"} gap={9}>
                <AppTypography fontSize='18px' fontWeight='bold'>Users</AppTypography>
                <Flex alignItems="center" backgroundColor={"bG"} paddingRight="7.5px" rounded="8px">
                    <AppInput name='newUser' value={newUser} placeholder="Enter email" border="none" onChange={handleChange} />
                    <BasicButton
                        py={3}
                        px={4}
                        sizes="medium"
                        isDisabled={sendInvitationEmail.isLoading}
                        isLoading={sendInvitationEmail.isLoading}
                        onClick={handleSendingInvitationEmail}
                    >
                        Send Invitation
                    </BasicButton>
                </Flex>
                <UserList users={fetchInvitations.data?.data || []} isLoading={fetchInvitations.isLoading} />
            </Flex>
        </AppCard>
    )
}

export default Admins