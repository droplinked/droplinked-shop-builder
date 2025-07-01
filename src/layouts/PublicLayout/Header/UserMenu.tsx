import { Center, Flex, Text } from '@chakra-ui/react'
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd'
import { UserMd } from 'assets/icons/System/User/UserMd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import { UserMenu as ProducerUserMenu } from '../../ProducerLayout/Header/UserMenu/UserMenu'

function UserMenu() {
    const navigate = useNavigate()
    const { shop } = useAppStore()

    return (
        <Flex
            border='1px solid'
            borderColor='neutral.gray.900'
            borderRadius={8}
            userSelect='none'
        >
            <Flex
                as="button"
                alignItems='center'
                gap='6px'
                borderRight='inherit'
                borderColor='inherit'
                padding='10px 14px'
                onClick={() => navigate("/analytics/dashboard")}
            >
                <UserMd color='#fff' />
                <Text fontSize={14} fontWeight={500} color='text.white'>{shop?.name}</Text>
            </Flex>

            <ProducerUserMenu
                trigger={
                    <Center as='button' padding='10px'>
                        <ChevrondownMd color='#fff' />
                    </Center>
                }
            />
        </Flex>
    )
}

export default UserMenu