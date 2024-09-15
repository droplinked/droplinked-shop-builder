import { Center, Flex, FormLabel, Link } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import React from 'react'
import styles from "./styles.module.scss"

interface Props {
    link: string
}

export default function AppShareableLink({ link }: Props) {
    return (
        <Flex alignItems={"center"} gap={4}>
            <LinkInput link={link} />
            <ShareButton link={link} />
        </Flex>
    )
}

function LinkInput({ link }: Props) {
    return (
        <Flex className={styles["input-group"]}>
            <input defaultValue={`${link.slice(0, 22)}...`} placeholder=" " readOnly />
            <FormLabel>Payment Link</FormLabel>
            <ClipboardText text={link} />
        </Flex>
    )
}

function ShareButton({ link }: Props) {
    return (
        <Link href={link} target='_blank'>
            <Center width={12} height={12} borderRadius={8} bgColor={"#3C3C3C"}>
                <AppIcons.Share />
            </Center>
        </Link>
    )
}