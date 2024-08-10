import { Button, Center, Flex, FormLabel } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import { SHOP_URL } from 'lib/utils/app/variable'
import React, { useRef } from 'react'
import QRCode from 'react-qr-code'
import ShareButton from '../ShareButton'
import styles from "./styles.module.scss"

function QRCodeView({ productID, colorPallete }: { productID: string; colorPallete: string }) {
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
                    <Flex flexGrow={1}>
                        <div className={styles["input-group"]}>
                            <input defaultValue={`${productLink.slice(0, 22)}...`} placeholder=" " readOnly />
                            <FormLabel left={8}>Payment Link</FormLabel>
                            <ClipboardText text={productLink} />
                        </div>
                    </Flex>
                    <ShareButton productLink={productLink} />
                </Flex>

                <Button display={"flex"} alignItems={"center"} gap={2} borderRadius={8} background={"#2BCFA1"} _hover={{}} _active={{}} onClick={downloadQRCode}>
                    <AppIcons.Download />
                    Download
                </Button>
            </Flex>
        </Flex >
    )
}

export default QRCodeView