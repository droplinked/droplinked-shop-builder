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
                        <Flex key={key} position="relative" border="1px solid #313131" borderRadius="8px" alignItems="center" height="200px" justifyContent="center">
                            <Box position="absolute" top={2} right={2}>
                                <AppIcons.Close cursor="pointer" onClick={() => deleted(el)} width="16px" height="16px" />
                            </Box>
                            <Image src={el} maxWidth="75%" maxHeight="75%" borderRadius="8px" />
                        </Flex>
                    ))}
                </SimpleGrid>
            ) : null}
        </>
    )
}

export default UploadImagesList