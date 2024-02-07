import { Flex, FlexProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface IProps extends FlexProps { }
function DashboardEmpty(props: IProps) {
    return (
        <Flex justifyContent="center" alignItems="center" minHeight="400px" {...props}>
            <Flex justifyContent="center" alignItems="center" borderRadius="4px" gap="4px" backgroundColor="#292929" width="141px" padding="10px 0">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_13770_2770)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7 12.25V6.8C7.7 6.35817 8.05817 6 8.5 6C8.94183 6 9.3 6.35817 9.3 6.8V12.25C9.3 12.6918 8.94183 13.05 8.5 13.05C8.05817 13.05 7.7 12.6918 7.7 12.25Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 14.5C12.0899 14.5 15 11.5899 15 8C15 4.41015 12.0899 1.5 8.5 1.5C4.91015 1.5 2 4.41015 2 8C2 11.5899 4.91015 14.5 8.5 14.5ZM8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="white" />
                        <path d="M9.5 4C9.5 4.55228 9.05229 5 8.5 5C7.94772 5 7.5 4.55228 7.5 4C7.5 3.44772 7.94772 3 8.5 3C9.05229 3 9.5 3.44772 9.5 4Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_13770_2770">
                            <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                        </clipPath>
                    </defs>
                </svg>
                <AppTypography fontSize="14px" position="relative" top="1px">Nothing to see</AppTypography>
            </Flex>
        </Flex>
    )
}

export default DashboardEmpty