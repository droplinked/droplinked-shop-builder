import { Box, Flex, Image, Link } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { UserShop } from 'lib/apis/shop/interfaces'
import { switchShopService } from 'lib/apis/shop/shopServices'
import useAppStore from 'lib/stores/app/appStore'
import { appDevelopment } from 'lib/utils/app/variable'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ShopRow({ shop }: { shop: UserShop }) {
    const { updateState } = useAppStore()
    const navigate = useNavigate()
    const { showToast } = useAppToast()
    const [isLoading, setLoading] = useState(false)
    const shopLink = `${appDevelopment ? "dev." : ""}droplinked.io/${shop.name}`
    const shopLogo = shop.logo || "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/485e583b2b3048f7b540dc7fa867021eba57be89781c1a6ee4f81156412c88e6.png_st.png"

    const switchToShop = async () => {
        try {
            if (shop.selected) return

            setLoading(true)
            const { data: { access_token, refresh_token, shop: fetchedShop, user } } = await switchShopService(shop._id)
            updateState({ key: "access_token", params: access_token })
            updateState({ key: "refresh_token", params: refresh_token })
            updateState({ key: "shop", params: fetchedShop })
            updateState({ key: "user", params: user })
            navigate("/dashboard")
        } catch (error) {
            showToast({ message: "", type: "error" })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"} gap={3}>
                {/* image and pulse */}
                <Box position={"relative"}>
                    <Image
                        width={20}
                        borderRadius={"50%"}
                        src={shopLogo}
                    />
                    {/* <Box className={styles["pulse-container"]} bgColor={isActive ? "primary" : "#E63F43"}>
                        <span />
                    </Box> */}
                </Box>

                {/* name and link */}
                <Flex direction={"column"}>
                    <AppTypography fontSize={24} fontWeight={700} color={"white"}>{shop.name}</AppTypography>
                    <Link
                        href={`https://${shopLink}`}
                        target='_blank'
                        fontSize={16}
                        fontWeight={500}
                        color={"#C2C2C2"}
                        isExternal
                    >
                        {shopLink}
                    </Link>
                </Flex>
            </Flex>

            <BasicButton sizes='medium' isDisabled={isLoading} isLoading={isLoading} onClick={switchToShop}>Switch</BasicButton>

        </Flex>
    )
}

export default ShopRow