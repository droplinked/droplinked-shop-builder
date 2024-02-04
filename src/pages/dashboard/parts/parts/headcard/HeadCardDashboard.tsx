import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    title: string
    link: string
}
function HeadCardDashboard({ link, title }: IProps) {
    return (
        <Flex justifyContent="space-between" alignItems="center">
            <AppTypography color="#FFF" fontSize="16px">{title}</AppTypography>
            <Link to={link}><AppTypography color="#33A9EC" fontSize="14px">See all</AppTypography></Link>
        </Flex>
    )
}

export default HeadCardDashboard