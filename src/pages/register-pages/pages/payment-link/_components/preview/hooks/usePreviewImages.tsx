import { PaymentLinkData } from "../../../context/PaymentLinkContext";

export interface PaymentLinkPreviewImage {
    desktop: string;
    mobile: string;
}

export default function usePreviewImages(paymentLinkData: PaymentLinkData): PaymentLinkPreviewImage {
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