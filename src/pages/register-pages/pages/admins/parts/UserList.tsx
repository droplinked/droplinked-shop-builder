import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { IInvitation } from 'lib/apis/user/interfaces'
import React from 'react'

function UserList({ users, isLoading }: { users: IInvitation[], isLoading: boolean }) {
    if (users.length === 0)
        return <AppTypography fontSize={"14px"}>You have not invited any users yet.</AppTypography>

    return (
        <TableContainer>
            <Table variant=''>
                <Thead>
                    <Tr>
                        <Th>Email</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        isLoading ?
                            Array.from({ length: 3 }).map((_, key) =>
                                <Tr key={key}>
                                    <Td>
                                        <AppSkeleton key={key} width={"100%"} height={"24px"} isLoaded={false}>{" "}</AppSkeleton>
                                    </Td>
                                    <Td>
                                        <AppSkeleton key={key} width={"100%"} height={"24px"} isLoaded={false}>{" "}</AppSkeleton>
                                    </Td>
                                </Tr>
                            ) :
                            users.map(user =>
                                <Tr key={user._id}>
                                    <Td>{user.recipientEmail}</Td>
                                    <Td>{user.status}</Td>
                                </Tr>
                            )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UserList