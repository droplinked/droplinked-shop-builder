import { Box, Flex, FlexProps, useDisclosure, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import EmbedCodeModal from './parts/modal/EmbedCodeModal'

interface IProps {
    props?: FlexProps
}

function EmbedCode({ props }: IProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex backgroundColor="#141414" cursor="pointer" onClick={onOpen} position="relative" padding="24px 20px" gap="20px" borderRadius="8px" {...props}>
                <VStack align="stretch">
                    <AppTypography size="14px">Embed Code</AppTypography>
                    <AppTypography size="14px" color="#808080">Embed HTML or CSS code to implement a custom design</AppTypography>
                </VStack>
                <Box>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_12004_7420)">
                            <path d="M17.8644 6.86513C18.1617 6.09012 19.0274 5.70498 19.798 6.00489C20.5685 6.30479 20.9521 7.17618 20.6547 7.95118L14.1356 24.941C13.8383 25.716 12.9726 26.1012 12.202 25.8013C11.4315 25.5014 11.0479 24.63 11.3453 23.855L17.8644 6.86513Z" fill="#2BCFA1" />
                            <path d="M6.87868 8.39401L0.43934 14.8316C-0.146447 15.4009 -0.146446 16.3241 0.43934 16.8935L6.87868 23.4121C7.46447 23.9815 8.41422 23.9815 9 23.4121C9.58579 22.8428 9.58579 21.9196 9 21.3502L3.79502 16.0811C3.67907 15.9638 3.67966 15.7748 3.79634 15.6581L9 10.4559C9.58579 9.88653 9.58579 8.96339 9 8.39401C8.41422 7.82463 7.46447 7.82463 6.87868 8.39401Z" fill="#2BCFA1" />
                            <path d="M25.1213 8.39401L31.5607 14.8316C32.1465 15.4009 32.1465 16.3241 31.5607 16.8935L25.1213 23.4121C24.5355 23.9815 23.5858 23.9815 23 23.4121C22.4142 22.8428 22.4142 21.9196 23 21.3502L28.205 16.0811C28.3209 15.9638 28.3203 15.7748 28.2037 15.6581L23 10.4559C22.4142 9.88654 22.4142 8.96339 23 8.39401C23.5858 7.82463 24.5355 7.82463 25.1213 8.39401Z" fill="#2BCFA1" />
                        </g>
                        <defs>
                            <clipPath id="clip0_12004_7420">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Box>
            </Flex>
            {isOpen && <EmbedCodeModal open={true} close={onClose} />}
        </>
    )
}

export default EmbedCode