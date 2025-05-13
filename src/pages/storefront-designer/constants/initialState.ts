import { StateDesignPage } from '../types/designerTypes';
import { template_options_defaults } from './templateDefaults';

/**
 * Initial state for the storefront designer
 * Contains default values for the shop design
 */
export const initialStateDesignPage: StateDesignPage = {
    device: "desktop",
    socialPreview: {
        key: '',
        value: '',
        showPreview: false
    },
    shop: {
        templateID: "6523b829f31b22884436a8da",
        backgroundText: "",
        logo: "https://upload-file-droplinked.s3.amazonaws.com/af2155ee398a90b7bee96508a80d54939341aaec246ac8cd695dbb05c0aea8b8.png",
        discordURL: "",
        instagramURL: "",
        twitterURL: "",
        facebookURL: "",
        linkedinURL: "",
        tiktokURL: "",
        webURL: "",
        telegramURL: "",
        youtubeURL: "",
        messengerURL: "",
        headerIcon: "https://upload-file-droplinked.s3.amazonaws.com/3ac6262ee09643c53e41f175725ca843f0e31ff9ab6075e2f4a13ad2cefe0685.png",
        backgroundColor: "#141414",
        backgroundImage: "https://upload-file-droplinked.s3.amazonaws.com/23af0b47bf743d9c9b0f5a79e0f3726b8d35a1175a5434e9174b8b34bb6b9c45.png",
        backgroundImageSecondary: "",
        fullWidthHero: false,
        productSectionText: "",
        shopDesign: {
            fontfamily: "Nunito Sans",
            headerBackground: "",
            isHeaderFixed: false,
            hiroLayout: "center",
            hiroTextColor: "",
            bannerLinks: [],
            footerLinks: [],
            iconHeaderColor: "#000",
            backgroundBody: "#11151A",
            foreground: "#262738",
            textColorParagraphs: "#F9F9F6",
            isCollectionShown: false,
            isLogoAsFavicon: false,
            faviconURL: "",
        },
        template_options: template_options_defaults,
        launchDate: null
    },
};