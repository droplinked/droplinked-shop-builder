import { Box, Flex, Link } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { UserShop } from 'lib/apis/shop/interfaces'
import { appDevelopment } from 'lib/utils/app/variable'
import useShopSwitcher from 'pages/shop-management/hooks/useShopSwitch'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ShopRow({ shop }: { shop: UserShop }) {
    const navigate = useNavigate()
    const { isLoading, mutateAsync: switchShop } = useShopSwitcher()
    const { showToast } = useAppToast()
    const shopLink = `${appDevelopment ? "dev." : ""}droplinked.io/${shop.name}`
    const shopLogo = shop.logo || "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/485e583b2b3048f7b540dc7fa867021eba57be89781c1a6ee4f81156412c88e6.png_st.png"

    const switchToShop = async () => {
        try {
            if (shop.selected) return navigate("/dashboard")
            await switchShop(shop._id)
        }
        catch {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"} gap={3}>
                {/* image and pulse */}
                <Box position={"relative"}>
                    <AppImage
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