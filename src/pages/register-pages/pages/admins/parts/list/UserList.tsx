import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
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
                <Tbody>
                    {
                        isLoading ?
                            Array.from({ length: 3 }).map((_, key) =>
                                <Tr key={key}>
                                    <Flex alignItems={"center"}>
                                        <Td flex={1} padding={0}>
                                            <AppSkeleton key={key} width={"200px"} height={"16px"} isLoaded={false}>{" "}</AppSkeleton>
                                        </Td>
                                        <Td padding={0}>
                                            <AppSkeleton key={key} width={"50px"} height={"16px"} isLoaded={false}>{" "}</AppSkeleton>
                                        </Td>
                                    </Flex>
                                </Tr>
                            ) :
                            users.map(user =>
                                <Tr key={user._id}>
                                    <Flex alignItems={"center"}>
                                        <Td flex={1} padding={0} fontSize={16} fontWeight={500}>{user.recipientEmail}</Td>
                                        <Td padding={0}>
                                            {
                                                user.status === "PENDING" ?
                                                    <Box width={"fit-content"} borderRadius={8} backgroundColor={"#292929"} padding={"12px 14px"} fontSize={12} fontWeight={500}>Invitation sent</Box> :
                                                    null
                                            }
                                        </Td>
                                    </Flex>
                                </Tr>
                            )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UserList