import { Box, Flex, Image, Link } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { UserShop } from 'lib/apis/shop/interfaces'
import { appDevelopment } from 'lib/utils/app/variable'
import React from 'react'

function ShopRow({ shop }: { shop: UserShop }) {
    // const isActive = shop.status === "Active"
    const shopLink = `${appDevelopment ? "dev." : ""}droplinked.io/${shop.name}`
    const shopLogo = shop.logo || "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/485e583b2b3048f7b540dc7fa867021eba57be89781c1a6ee4f81156412c88e6.png_st.png"

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"} gap={3}>
                {/* image and pulse */}
                <Box position={"relative"}>
                    <Image
                        width={20}
                        borderRadius={"50%"}
                        // src='https://upload-file-flatlay.s3.us-west-2.amazonaws.com/c86c8c2edfc46c677d995cbca4723b34ae6d31dcf820713fa8b66d3fe05e2615.jpeg'
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

            {/* action */}
            {/* {
                isActive ?
                    <RedButton>Deactivate</RedButton> :
                    <BasicButton>Activate</BasicButton>
            } */}

        </Flex>
    )
}

export default ShopRow