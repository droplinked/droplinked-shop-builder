import { createContext } from "react";
import { actionsDesignPage, IStateDesignPage, ITemplateOptions } from "./reducer";

interface IProps {
    state: IStateDesignPage;
    methods: {
        dispatch(action: actionsDesignPage): void;
        resetState: Function;
    };
}

export const template_options_defaults: ITemplateOptions = {
    "--dlk-lyt": {
        "--dlk-lyt-hdr": {
            "--dlk-lyt-hdr-styles": {},
            "--dlk-lyt-hdr-lgo": {},
            "--dlk-lyt-hdr-icn": {
                "--dlk-lyt-hdr-icn-styles": {},
                "--dlk-lyt-hdr-icn-prfl": {
                    "--dlk-lyt-hdr-icn-prfl-styles": {},
                    "--dlk-lyt-hdr-icn-prfl-ppvr": {
                        "--dlk-lyt-hdr-icn-prfl-ppvr-styles": {},
                        "--dlk-lyt-hdr-icn-prfl-ppvr-btns": {},
                    },
                    "--dlk-lyt-hdr-icn-prfl-mdl": {
                        "--dlk-lyt-hdr-icn-prfl-mdl-styles": {},
                    },
                },
                "--dlk-lyt-hdr-icn-crt": {
                    "--dlk-lyt-hdr-icn-crt-styles": {},
                    "--dlk-lyt-hdr-icn-crt-ppvr": {
                        "--dlk-lyt-hdr-icn-crt-ppvr-styles": {},
                    },
                },
                "--dlk-lyt-hdr-icn-ntf": {
                    "--dlk-lyt-hdr-icn-ntf-styles": {},
                    "--dlk-lyt-hdr-icn-ntf-ppvr": {
                        "--dlk-lyt-hdr-icn-ntf-ppvr-styles": {},
                    },
                },
            },
        },
        "--dlk-lyt-ftr": {
            "--dlk-lyt-ftr-styles": {},
            "--dlk-lyt-ftr-lgo": {},
            "--dlk-lyt-ftr-txt": {},
        },
    },
    "--dlk-comps": {
        "--dlk-comps-btn": {
            "--dlk-comps-btn-styles": {},
            "--dlk-comps-btn-out": {
                "--dlk-comps-btn-out-styles": {},
                "--dlk-comps-btn-out-pseudo": {
                    _hover: {},
                    _active: {},
                    _focus: {},
                },
            },
            "--dlk-comps-btn-fill": {
                "--dlk-comps-btn-fill-styles": {},
                "--dlk-comps-btn-fill-pseudo": {
                    _hover: {},
                    _active: {},
                    _focus: {},
                },
            },
        },
        "--dlk-comps-inps": {
            "--dlk-comps-inps-def": {},
            "--dlk-comps-inps-dds": {},
        },
        "--dlk-comps-mdl": {
            "--dlk-comps-mdl-styles": {},
        },
        "--dlk-comps-bc": {
            "--dlk-comps-bc-actv": {},
            "--dlk-comps-bc-def": {},
        },
    },
    "--dlk-pgs": {
        "--dlk-pgs-styles": {},
        "--dlk-pgs-hme": {
            "--dlk-pgs-hme-styles": {},
            "--dlk-pgs-hme-sd": {
                "--dlk-pgs-hme-sd-styles": {},
                "--dlk-pgs-hme-sd-srch": {
                    "--dlk-pgs-hme-sd-srch-styles": {},
                    "--dlk-pgs-hme-sd-srch-inp": {},
                    "--dlk-pgs-hme-sd-srch-icn": {},
                },
                "--dlk-pgs-hme-sd-prfl": {
                    "--dlk-pgs-hme-sd-prfl-styles": {},
                    "--dlk-pgs-hme-sd-prfl-soc": {
                        "--dlk-pgs-hme-sd-prfl-soc-styles": {},
                        "--dlk-pgs-hme-sd-prfl-soc-icn": {},
                    },
                    "--dlk-pgs-hme-sd-prfl-lgo": {},
                    "--dlk-pgs-hme-sd-prfl-txt": {},
                },
            },
            "--dlk-pgs-hme-prods": {
                "--dlk-pgs-hme-prods-styles": {},
                "--dlk-pgs-hme-prods-prod": {
                    "--dlk-pgs-hme-prods-prod-styles": {},
                    "--dlk-pgs-hme-prods-prod-img": {},
                    "--dlk-pgs-hme-prods-prod-ttl": {},
                    "--dlk-pgs-hme-prods-prod-prc": {},
                    "--dlk-pgs-hme-prods-prod-clr": {},
                },
            },
            "--dlk-pgs-hme-bnr": {
                "--dlk-pgs-hme-bnr-styles": {},
                "--dlk-pgs-hme-bnr-img": {},
                "--dlk-pgs-hme-bnr-txt": {
                    "--dlk-pgs-hme-bnr-txt-styles": {},
                    "--dlk-pgs-hme-bnr-txt-cntnt": {},
                },
            },
        },
        "--dlk-pgs-prod": {
            "--dlk-pgs-prod-styles": {},
            "--dlk-pgs-prod-dtls": {
                "--dlk-pgs-prod-dtls-styles": {},
                "--dlk-pgs-prod-dtls-grp": {
                    "--dlk-pgs-prod-dtls-grp-styles": {},
                    "--dlk-pgs-prod-dtls-grp-ttl": {},
                    "--dlk-pgs-prod-dtls-grp-prc": {
                        "--dlk-pgs-prod-dtls-grp-prc-styles": {},
                        "--dlk-pgs-prod-dtls-grp-prc-def": {},
                        "--dlk-pgs-prod-dtls-grp-prc-dis": {},
                    },
                    "--dlk-pgs-prod-dtls-grp-vars": {
                        "--dlk-pgs-prod-dtls-grp-vars-clr": {
                            "--dlk-pgs-prod-dtls-grp-vars-clr-styles": {},
                            "--dlk-pgs-prod-dtls-grp-vars-clr-lbl": {},
                            "--dlk-pgs-prod-dtls-grp-vars-clr-sel": {},
                            "--dlk-pgs-prod-dtls-grp-vars-clr-opts": {
                                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-styles": {},
                                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-actv": {},
                                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-def": {},
                            },
                        },
                        "--dlk-pgs-prod-dtls-grp-vars-sz": {
                            "--dlk-pgs-prod-dtls-grp-vars-sz-styles": {},
                            "--dlk-pgs-prod-dtls-grp-vars-sz-lbl": {},
                            "--dlk-pgs-prod-dtls-grp-vars-sz-sel": {},
                            "--dlk-pgs-prod-dtls-grp-vars-sz-opts": {
                                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-styles": {},
                                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-actv": {},
                                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-def": {},
                            },
                        },
                    },
                },
            },
            "--dlk-pgs-prod-sldr": {
                "--dlk-pgs-prod-sldr-styles": {},
                "--dlk-pgs-prod-sldr-grp": {
                    "--dlk-pgs-prod-sldr-grp-styles": {},
                    "--dlk-pgs-prod-sldr-grp-img": {},
                    "--dlk-pgs-prod-sldr-grp-lst": {
                        "--dlk-pgs-prod-sldr-grp-lst-styles": {},
                        "--dlk-pgs-prod-sldr-grp-lst-opts": {},
                    },
                },
            },
        },
        "--dlk-pgs-ckt": {
            "--dlk-pgs-ckt-styles": {},
            "--dlk-pgs-ckt-accs": {
                "--dlk-pgs-ckt-accs-styles": {},
                "--dlk-pgs-ckt-accs-em": {
                    "--dlk-pgs-ckt-accs-em-styles": {},
                    "--dlk-pgs-ckt-accs-em-inp": {},
                    "--dlk-pgs-ckt-accs-em-btn": {},
                },
                "--dlk-pgs-ckt-accs-addr": {
                    "--dlk-pgs-ckt-accs-addr-styles": {},
                    "--dlk-pgs-ckt-accs-addr-trig": {
                        "--dlk-pgs-ckt-accs-addr-trig-styles": {},
                        "--dlk-pgs-ckt-accs-addr-trig-txt": {},
                        "--dlk-pgs-ckt-accs-addr-trig-icn": {},
                    },
                    "--dlk-pgs-ckt-accs-addr-mdl": {
                        "--dlk-pgs-ckt-accs-addr-mdl-styles": {},
                    },
                    "--dlk-pgs-ckt-accs-addr-btn": {},
                },
                "--dlk-pgs-ckt-accs-shp": {
                    "--dlk-pgs-ckt-accs-shp-styles": {},
                },
                "--dlk-pgs-ckt-accs-pmt": {
                    "--dlk-pgs-ckt-accs-pmt-styles": {},
                },
            },
            "--dlk-pgs-ckt-gft": {
                "--dlk-pgs-ckt-gft-styles": {},
                "--dlk-pgs-ckt-gft-inp": {},
                "--dlk-pgs-ckt-gft-btn": {},
            },
            "--dlk-pgs-ckt-smry": {
                "--dlk-pgs-ckt-smry-styles": {},
                "--dlk-pgs-ckt-smry-hdr": {},
                "--dlk-pgs-ckt-smry-sep": {},
                "--dlk-pgs-ckt-smry-itm": {
                    "--dlk-pgs-ckt-smry-itm-styles": {},
                    "--dlk-pgs-ckt-smry-itm-img": {},
                    "--dlk-pgs-ckt-smry-itm-ttl": {},
                    "--dlk-pgs-ckt-smry-itm-qty": {},
                    "--dlk-pgs-ckt-smry-itm-prc": {},
                },
            },
            "--dlk-pgs-ckt-totl": {
                "--dlk-pgs-ckt-totl-styles": {},
                "--dlk-pgs-ckt-totl-itm": {
                    "--dlk-pgs-ckt-totl-itm-styles": {},
                    "--dlk-pgs-ckt-totl-itm-ttl": {},
                    "--dlk-pgs-ckt-totl-itm-prc": {},
                },
            },
        },
    },
};

export const initialStateDesignPage: IStateDesignPage = {
    device: "desktop",
    optionSelected: "theme",
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

export const designContext = createContext<IProps>({
    state: initialStateDesignPage,
    methods: {
        dispatch: null,
        resetState: () => { },
    },
});
