import { Box, Flex, Image, Link } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { appDevelopment } from 'lib/utils/app/variable'
import React from 'react'
import RedButton from '../red-button/RedButton'
import styles from "./styles.module.scss"

interface Props {
    shop: any
}

function ShopRow({ shop }: Props) {
    const isActive = shop.status === "Active"

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"} gap={3}>
                {/* image and pulse */}
                <Box position={"relative"}>
                    <Image
                        width={"80px"}
                        borderRadius={"50%"}
                        src='https://upload-file-flatlay.s3.us-west-2.amazonaws.com/c86c8c2edfc46c677d995cbca4723b34ae6d31dcf820713fa8b66d3fe05e2615.jpeg'
                    />
                    <Box className={styles["pulse-container"]} bgColor={isActive ? "primary" : "#E63F43"}>
                        <span />
                    </Box>
                </Box>

                {/* name and link */}
                <Flex direction={"column"}>
                    <AppTypography fontSize={24} fontWeight={700} color={"white"}>{shop.name}</AppTypography>
                    <Link fontSize={16} fontWeight={500} color={"#C2C2C2"}>
                        {`${appDevelopment ? "dev." : ""}droplinked.io/${shop.name}`}
                    </Link>
                </Flex>
            </Flex>

            {/* action */}
            {
                isActive ?
                    <RedButton>Deactivate</RedButton> :
                    <BasicButton>Activate</BasicButton>
            }

        </Flex>
    )
}

export default ShopRow