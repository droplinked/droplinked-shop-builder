import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    image: string
    title: string
    description: string
    linkText: string
    linkTo: string
    isExternal?: boolean // prop to handle external link logic
}

function EmptyState({ image, title, description, linkText, linkTo, isExternal = false }: Props) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (isExternal || /^https?:\/\//.test(linkTo)) window.open(linkTo, '_blank')
        else navigate(linkTo)
    }

    return (
        <Flex
            direction="column"
            gap={9}
            padding={12}
        >
            <AppImage height="161px" src={image} objectFit="contain" />

            <Flex direction="column" alignItems="center" gap={1} textAlign="center">
                <Text fontWeight={500} color="#fff">{title}</Text>
                <Text fontSize={14} color="#7B7B7B">{description}</Text>

                <Flex
                    as="button"
                    alignItems="center"
                    gap={1}
                    padding="8px 12px"
                    fontSize={12}
                    fontWeight={500}
                    color="#179EF8"
                    sx={{ svg: { boxSize: 4, path: { stroke: "#179EF8" } } }}
                    onClick={handleClick}
                >
                    {linkText}
                    <AppIcons.ExternalArrow />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EmptyState