import { Button, Center, Flex, FormLabel, Link } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import { SHOP_URL } from 'lib/utils/app/variable'
import React, { useRef } from 'react'
import QRCode from 'react-qr-code'
import { ColorPalleteOption } from '../../PaymentLinkModal'
import styles from "./styles.module.scss"

interface Props {
    productID: string
    colorPallete: ColorPalleteOption
}

export default function QRCodeView({ productID, colorPallete }: Props) {
    const qrCodeContainerRef = useRef<HTMLDivElement>(null)
    const productLink = `${SHOP_URL}/paylink/${productID}`

    const downloadQRCode = () => {
        const svgElement = qrCodeContainerRef.current.querySelector('svg')
        if (!svgElement) return

        const { width, height } = svgElement.getBoundingClientRect()
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height
            context.drawImage(img, 0, 0, width, height)
            const pngDataUrl = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = pngDataUrl
            link.download = 'qrcode.png'
            link.click()

            URL.revokeObjectURL(url)
        }
        img.src = url
    }

    return (
        <Flex direction={"column"} gap={9}>
            <Center
                ref={qrCodeContainerRef}
                backgroundColor={colorPallete === "light" ? "#fff" : "#000"}
                padding={6}
                borderRadius={8}
            >
                <QRCode
                    style={{ height: "auto", width: "100%" }}
                    value={productLink}
                    fgColor={colorPallete === "light" ? "#000000" : "#ffffff"}
                    bgColor={colorPallete === "light" ? "#fff" : "#000"}
                />
            </Center>

            <Flex direction={"column"} gap={4}>
                <Flex alignItems={"center"} gap={4}>
                    <LinkInput productLink={productLink} />
                    <ShareButton productLink={productLink} />
                </Flex>
                <DownloadButton onClick={downloadQRCode} />
            </Flex>
        </Flex>
    )
}

function LinkInput({ productLink }: { productLink: string }) {
    return (
        <Flex className={styles["input-group"]}>
            <input defaultValue={`${productLink.slice(0, 22)}...`} placeholder=" " readOnly />
            <FormLabel>Payment Link</FormLabel>
            <ClipboardText text={productLink} />
        </Flex>
    )
}

function ShareButton({ productLink }: { productLink: string }) {
    return (
        <Link href={productLink} target='_blank'>
            <Center width={12} height={12} borderRadius={8} bgColor={"#3C3C3C"} _hover={{}} _active={{}}>
                <AppIcons.Share />
            </Center>
        </Link>
    )
}

function DownloadButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            display="flex"
            alignItems="center"
            gap={2}
            borderRadius={8}
            background="#2BCFA1"
            _hover={{}}
            _active={{}}
            onClick={onClick}
        >
            <AppIcons.Download />
            Download
        </Button>
    )
}