import { Avatar, Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { IInvitation } from 'lib/apis/user/interfaces'
import React from 'react'

interface Props {
    userData: IInvitation
}

export default function UserNameColumn({ userData }: Props) {
    return (
        <Flex alignItems={"center"} gap={4}>
            <Avatar src={userData?.recipientEmail} name={userData?.recipientEmail} />
            <AppTypography fontSize={"16px"} fontWeight={400} color={"#fff"}>
                {userData.recipientEmail}
            </AppTypography>
        </Flex>
    )
}
