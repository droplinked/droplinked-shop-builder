import { Flex, Link, Text } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import useShopSwitcher from 'hooks/shop/useShopSwitch'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserShop } from 'services/shop/interfaces'
import { appDevelopment } from 'utils/app/variable'

function ShopRow({ shop }: { shop: UserShop }) {
    const navigate = useNavigate()
    const { t } = useLocaleResources('shopManagement')
    const { isLoading, mutateAsync: switchShop } = useShopSwitcher()
    const { showToast } = useAppToast()

    const shopLink = `${appDevelopment ? "dev." : ""}droplinked.io/${shop.name}`
    const shopLogo = shop.logo || "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/485e583b2b3048f7b540dc7fa867021eba57be89781c1a6ee4f81156412c88e6.png_st.png"

    const switchToShop = async () => {
        try {
            if (shop.selected) return navigate("/analytics")
            await switchShop(shop._id)
        }
        catch {
            showToast({ type: "error", message: t('ShopRow.switchError') })
        }
    }

    return (
        <Flex
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
        >
            {/* image and pulse */}
            <AppImage
                width={20}
                height={20}
                borderRadius="50%"
                objectFit="contain"
                src={shopLogo}
            />

            {/* name and link */}
            <Flex flex={1} direction="column">
                <Text fontSize={24} fontWeight={700} color="text.white">{shop.name}</Text>
                <Link
                    href={`https://${shopLink}`}
                    target='_blank'
                    fontSize={16}
                    fontWeight={500}
                    color="#C2C2C2"
                    isExternal
                >
                    {shopLink.length > 20 ? shopLink.slice(0, 20) + "..." : shopLink}
                </Link>
            </Flex>

            <BasicButton
                sizes='medium'
                isDisabled={isLoading}
                isLoading={isLoading}
                onClick={switchToShop}
            >
                {t('ShopRow.switchButton')}
            </BasicButton>
        </Flex>
    )
}

export default ShopRow