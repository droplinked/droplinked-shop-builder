import { Box, BoxProps, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface IProps extends BoxProps { }

function DefaultHoverBox(props: IProps) {
    return (
        <Flex {...props} width="200px" justifyContent="center" padding="30px 10px" backgroundColor="#141414">
            <VStack textAlign="center" align="stretch">
                <Flex justifyContent="center"><AppIcons.upload width="50px" /></Flex>
                <AppTypography size='16px' color="#666">
                    Upload JPG, JPEG, PNG
                    <br />
                    (Max 5 MB)
                </AppTypography>
            </VStack>
        </Flex>
    )
}

export default DefaultHoverBox