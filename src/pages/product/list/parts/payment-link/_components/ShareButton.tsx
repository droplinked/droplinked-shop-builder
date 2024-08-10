import { Center, Link } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

export default function ShareButton({ productLink }: { productLink: string }) {
    return (
        <Link href={productLink} target='_blank'>
            <Center width={12} height={12} borderRadius={8} bgColor={"#3C3C3C"} _hover={{}} _active={{}}>
                <AppIcons.Share />
            </Center>
        </Link>
    )
}