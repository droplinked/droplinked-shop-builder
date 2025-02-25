import { Center, Flex, FormLabel, Link } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import React from 'react'
import styles from "./styles.module.scss"

interface Props {
    link: string;
    buttonBgColor?: string;
}

export default function AppShareableLink({ link, buttonBgColor }: Props) {
    return (
        <Flex alignItems={"center"} gap={4} width='100%'>
            <LinkInput link={link} />
            <ShareButton link={link} buttonBgColor={buttonBgColor} />
        </Flex>
    )
}

function LinkInput({ link }: Props) {
    return (
        <Flex className={styles["input-group"]}>
            <input style={{ background: "transparent" }} defaultValue={`${link.slice(0, 22)}...`} placeholder=" " readOnly />
            <FormLabel>Payment Link</FormLabel>
            <ClipboardText text={link} />
        </Flex>
    )
}

function ShareButton({ link, buttonBgColor }: Props) {
    return (
        <Link href={link} target='_blank'>
            <Center width={12} height={12} borderRadius={8} bgColor={buttonBgColor || "#3C3C3C"} >
                <AppIcons.Share />
            </Center>
        </Link>
    )
}