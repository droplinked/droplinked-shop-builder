import { Flex, Spinner, Text } from '@chakra-ui/react'
import { LogoutMd } from 'assets/icons/Action/LogOut/LogoutMd'
import { WalletMd } from 'assets/icons/Finance/Wallet/WalletMd'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import { GlobeMd } from 'assets/icons/Sign/Globe/GlobeMd'
import { ShopMd } from 'assets/icons/System/Shop/ShopMd'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useProfile } from 'hooks/useProfile/useProfile'
import useShopUrl from 'hooks/useShopUrl/useShopUrl'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getShopCredit } from 'services/shop/shopServices'

function MenuItemActions({ isMenuOpen }: { isMenuOpen: boolean }) {
    const navigate = useNavigate()
    const { logoutUser } = useProfile()
    const shopUrl = useShopUrl()
    const { getFormattedPrice } = useCurrencyConverter()
    const { t, isRTL } = useLocaleResources('layout/ProducerLayout')

    const { isFetching, data } = useQuery({
        queryKey: ['shop-credit'],
        queryFn: () => getShopCredit(),
        enabled: isMenuOpen
    })

    const credit = data?.data?.data?.credit ?? 0

    const actions = [
        {
            icon: <WalletMd color='#FFF' />,
            label: t('UserMenu.MenuItemActions.labels.credit'),
            color: '#FFF',
            rightContent: isFetching
                ? <Spinner size='sm' color='text.primary' />
                : (
                    <Text fontSize={14} fontWeight={500} color="text.primary">
                        {getFormattedPrice({ amount: credit, toUSD: false, toFixed: true })}
                    </Text>
                )
        },
        {
            icon: <GlobeMd color='#FFF' />,
            label: t('UserMenu.MenuItemActions.actions.viewStore'),
            color: '#FFF',
            onClick: () => window.open(shopUrl, '_blank')
        },
        {
            icon: <ShopMd color='#FFF' />,
            label: t('UserMenu.MenuItemActions.actions.switch'),
            color: '#FFF',
            rightContent: isRTL ? <ChevronleftMd color='#878787' /> : <ChevronrightMd color='#878787' />,
            onClick: () => navigate('/shop-management')
        },
        {
            icon: <LogoutMd color='#FF2244' />,
            label: t('UserMenu.MenuItemActions.actions.logout'),
            color: '#FF2244',
            onClick: logoutUser
        }
    ]

    const renderActionButton = (action: any) => {
        const { icon, label, color, rightContent, onClick } = action

        return (
            <Flex
                as={onClick ? 'button' : 'div'}
                align='center'
                gap={3}
                border="1px solid transparent"
                borderRadius={8}
                padding="14px 16px"
                textAlign="left"
                _hover={{ borderColor: 'neutral.gray.750', backgroundColor: 'neutral.gray.800' }}
                onClick={onClick}
            >
                {icon}
                <Text
                    flex={1}
                    fontSize={14}
                    textAlign={isRTL ? 'right' : 'left'}
                    color={color}
                >
                    {label}
                </Text>
                {rightContent}
            </Flex>
        )
    }

    return (
        <Flex className='menuItem' direction="column" gap={1}>
            {actions.map(renderActionButton)}
        </Flex>
    )
}

export default MenuItemActions