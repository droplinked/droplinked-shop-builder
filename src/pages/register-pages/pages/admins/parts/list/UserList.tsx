import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { IInvitation } from 'lib/apis/user/interfaces'
import React from 'react'

function UserList({ users, isLoading }: { users: IInvitation[], isLoading: boolean }) {
    return (
        <TableContainer>
            <Table variant=''>
                <Tbody>
                    <Flex direction={"column"} gap={4}>
                        {
                            isLoading ?
                                Array.from({ length: 3 }).map((_, key) =>
                                    <Tr key={key}>
                                        <Flex alignItems={"center"}>
                                            <Td flex={1} padding={0}>
                                                <AppSkeleton key={key} width={"200px"} height={"48px"} isLoaded={false}>{" "}</AppSkeleton>
                                            </Td>
                                            <Td padding={0}>
                                                <AppSkeleton key={key} width={"100px"} height={"48px"} isLoaded={false}>{" "}</AppSkeleton>
                                            </Td>
                                        </Flex>
                                    </Tr>
                                ) :
                                users.length === 0 ?
                                    <AppTypography fontSize={"14px"}>You have not invited any users yet.</AppTypography> :
                                    users.map(user =>
                                        <Tr key={user._id}>
                                            <Flex alignItems={"center"}>
                                                <Td flex={1} padding={0} fontSize={16} fontWeight={500}>
                                                    <Flex alignItems={"center"} gap={4}>
                                                        <AppIcons.UserInvitation />
                                                        {user.recipientEmail}
                                                    </Flex>
                                                </Td>
                                                <Td padding={0}>
                                                    {
                                                        user.status === "PENDING" ?
                                                            <Box width={"fit-content"} borderRadius={8} backgroundColor={"#292929"} padding={"12px 14px"} fontSize={12} fontWeight={500}>Invitation sent</Box>
                                                            :
                                                            null // for now
                                                    }
                                                </Td>
                                            </Flex>
                                        </Tr>
                                    )
                        }
                    </Flex>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UserList