import { Box, Flex, Image, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import appUploadImageContext from 'components/common/upload/image/context'
import React, { useContext } from 'react'

function UploadImagesList() {
    const { values, deleted } = useContext(appUploadImageContext)

    return (
        <>
            {values.length && typeof values === "object" ? (
                <SimpleGrid columns={4} spacing={4}>
                    {values.map((el: any, key: number) => (
                        <Flex key={key} position="relative" alignItems="baseline" justifyContent="center">
                            <Box position="absolute" top={2} right={2}>
                                <AppIcons.close cursor="pointer" onClick={() => deleted(el)} width="16px" height="16px" />
                            </Box>
                            <Image src={el} width="100%" borderRadius="8px" />
                        </Flex>
                    ))}
                </SimpleGrid>
            ) : null}
        </>
    )
}

export default UploadImagesList