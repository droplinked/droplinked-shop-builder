import { useContext } from "react";
import { PaymentLinkContext } from "../../../context/PaymentLinkContext";

export interface PaymentLinkPreviewImage {
    desktop: string;
    mobile: string;
}

export type ScreenSize = keyof PaymentLinkPreviewImage

export default function usePreviewImages(): PaymentLinkPreviewImage {
    const { paymentLinkData } = useContext(PaymentLinkContext)

    const { variantsStyle, additionalNote } = paymentLinkData
    const imageBasePath = '/assets/images/paymentLink'
    const imageType = variantsStyle === "DROPDOWN" ? "dropdown" : "selector"

    const desktopImage = additionalNote ?
        `${imageBasePath}/desktop-${imageType}-note.png` :
        `${imageBasePath}/desktop-${imageType}.png`

    const mobileImage = `${imageBasePath}/mobile-${imageType}.png`

    return {
        desktop: desktopImage,
        mobile: mobileImage
    }
}