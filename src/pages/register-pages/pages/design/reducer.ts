import { StyleProps, SystemStyleObject } from "@chakra-ui/react";

export type IPreviewSections = "theme" | "header" | "hero" | "profile" | "products" | "footer";

export interface ITemplateOptions {
    "--dlk-lyt": {
        "--dlk-lyt-hdr": {
            "--dlk-lyt-hdr-styles": StyleProps;
            "--dlk-lyt-hdr-lgo": StyleProps;
            "--dlk-lyt-hdr-icn": {
                "--dlk-lyt-hdr-icn-styles": StyleProps;
                "--dlk-lyt-hdr-icn-prfl": {
                    "--dlk-lyt-hdr-icn-prfl-styles": StyleProps;
                    "--dlk-lyt-hdr-icn-prfl-ppvr": {
                        "--dlk-lyt-hdr-icn-prfl-ppvr-styles": StyleProps;
                        "--dlk-lyt-hdr-icn-prfl-ppvr-btns": StyleProps;
                    };
                    "--dlk-lyt-hdr-icn-prfl-mdl": {
                        "--dlk-lyt-hdr-icn-prfl-mdl-styles": StyleProps;
                    };
                };
                "--dlk-lyt-hdr-icn-crt": {
                    "--dlk-lyt-hdr-icn-crt-styles": StyleProps;
                    "--dlk-lyt-hdr-icn-crt-ppvr": {
                        "--dlk-lyt-hdr-icn-crt-ppvr-styles": StyleProps;
                    };
                };
                "--dlk-lyt-hdr-icn-ntf": {
                    "--dlk-lyt-hdr-icn-ntf-styles": StyleProps;
                    "--dlk-lyt-hdr-icn-ntf-ppvr": {
                        "--dlk-lyt-hdr-icn-ntf-ppvr-styles": StyleProps;
                    };
                };
            };
        };
        "--dlk-lyt-ftr": {
            "--dlk-lyt-ftr-styles": any;
            "--dlk-lyt-ftr-lgo": any;
            "--dlk-lyt-ftr-txt": any;
        };
    };
    "--dlk-comps": {
        "--dlk-comps-btn": {
            "--dlk-comps-btn-styles": StyleProps;
            "--dlk-comps-btn-out": {
                "--dlk-comps-btn-out-pseudo": { _hover: any; _active: any; _focus: any };
                "--dlk-comps-btn-out-styles": StyleProps;
            };
            "--dlk-comps-btn-fill": {
                "--dlk-comps-btn-fill-pseudo": { _hover: any; _active: any; _focus: any };
                "--dlk-comps-btn-fill-styles": StyleProps;
            };
        };
        "--dlk-comps-inps": {
            "--dlk-comps-inps-def": StyleProps;
            "--dlk-comps-inps-dds": StyleProps;
        };
        "--dlk-comps-mdl": {
            "--dlk-comps-mdl-styles": StyleProps;
        };
        "--dlk-comps-bc": {
            "--dlk-comps-bc-actv": StyleProps;
            "--dlk-comps-bc-def": StyleProps;
        };
    };
    "--dlk-pgs": {
        "--dlk-pgs-styles": StyleProps;
        "--dlk-pgs-hme": {
            "--dlk-pgs-hme-styles": StyleProps;
            "--dlk-pgs-hme-sd": {
                "--dlk-pgs-hme-sd-styles": StyleProps;
                "--dlk-pgs-hme-sd-srch": {
                    "--dlk-pgs-hme-sd-srch-styles": StyleProps;
                    "--dlk-pgs-hme-sd-srch-inp": StyleProps;
                    "--dlk-pgs-hme-sd-srch-icn": StyleProps;
                };
                "--dlk-pgs-hme-sd-prfl": {
                    "--dlk-pgs-hme-sd-prfl-styles": StyleProps;
                    "--dlk-pgs-hme-sd-prfl-soc": {
                        "--dlk-pgs-hme-sd-prfl-soc-styles": StyleProps;
                        "--dlk-pgs-hme-sd-prfl-soc-icn": StyleProps;
                    };
                    "--dlk-pgs-hme-sd-prfl-lgo": StyleProps;
                    "--dlk-pgs-hme-sd-prfl-txt": StyleProps;
                };
            };
            "--dlk-pgs-hme-prods": {
                "--dlk-pgs-hme-prods-styles": StyleProps;
                "--dlk-pgs-hme-prods-prod": {
                    "--dlk-pgs-hme-prods-prod-styles": StyleProps;
                    "--dlk-pgs-hme-prods-prod-img": StyleProps;
                    "--dlk-pgs-hme-prods-prod-ttl": StyleProps;
                    "--dlk-pgs-hme-prods-prod-prc": StyleProps;
                    "--dlk-pgs-hme-prods-prod-clr": StyleProps;
                };
            };
            "--dlk-pgs-hme-bnr": {
                "--dlk-pgs-hme-bnr-styles": StyleProps;
                "--dlk-pgs-hme-bnr-img": StyleProps;
                "--dlk-pgs-hme-bnr-txt": StyleProps;
            };
        };
        "--dlk-pgs-prod": {
            "--dlk-pgs-prod-styles": StyleProps;
            "--dlk-pgs-prod-dtls": {
                "--dlk-pgs-prod-dtls-styles": StyleProps;
                "--dlk-pgs-prod-dtls-grp": {
                    "--dlk-pgs-prod-dtls-grp-styles": StyleProps;
                    "--dlk-pgs-prod-dtls-grp-ttl": StyleProps;
                    "--dlk-pgs-prod-dtls-grp-prc": {
                        "--dlk-pgs-prod-dtls-grp-prc-styles": StyleProps;
                        "--dlk-pgs-prod-dtls-grp-prc-def": StyleProps;
                        "--dlk-pgs-prod-dtls-grp-prc-dis": StyleProps;
                    };
                    "--dlk-pgs-prod-dtls-grp-vars": {
                        "--dlk-pgs-prod-dtls-grp-vars-clr": {
                            "--dlk-pgs-prod-dtls-grp-vars-clr-styles": StyleProps;
                            "--dlk-pgs-prod-dtls-grp-vars-clr-lbl": StyleProps;
                            "--dlk-pgs-prod-dtls-grp-vars-clr-sel": StyleProps;
                            "--dlk-pgs-prod-dtls-grp-vars-clr-opts": {
                                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-styles": StyleProps;
                                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-actv": StyleProps;
                                "--dlk-pgs-prod-dtls-grp-vars-clr-opts-def": StyleProps;
                            };
                        };
                        "--dlk-pgs-prod-dtls-grp-vars-sz": {
                            "--dlk-pgs-prod-dtls-grp-vars-sz-styles": StyleProps;
                            "--dlk-pgs-prod-dtls-grp-vars-sz-lbl": StyleProps;
                            "--dlk-pgs-prod-dtls-grp-vars-sz-sel": StyleProps;
                            "--dlk-pgs-prod-dtls-grp-vars-sz-opts": {
                                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-styles": StyleProps;
                                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-actv": StyleProps;
                                "--dlk-pgs-prod-dtls-grp-vars-sz-opts-def": StyleProps;
                            };
                        };
                    };
                };
            };
            "--dlk-pgs-prod-sldr": {
                "--dlk-pgs-prod-sldr-styles": StyleProps;
                "--dlk-pgs-prod-sldr-grp": {
                    "--dlk-pgs-prod-sldr-grp-styles": StyleProps;
                    "--dlk-pgs-prod-sldr-grp-img": StyleProps;
                    "--dlk-pgs-prod-sldr-grp-lst": {
                        "--dlk-pgs-prod-sldr-grp-lst-styles": StyleProps;
                        "--dlk-pgs-prod-sldr-grp-lst-opts": StyleProps;
                    };
                };
            };
        };
        "--dlk-pgs-ckt": {
            "--dlk-pgs-ckt-styles": StyleProps;
            "--dlk-pgs-ckt-accs": {
                "--dlk-pgs-ckt-accs-styles": StyleProps;
                "--dlk-pgs-ckt-accs-em": {
                    "--dlk-pgs-ckt-accs-em-styles": StyleProps;
                    "--dlk-pgs-ckt-accs-em-inp": StyleProps;
                    "--dlk-pgs-ckt-accs-em-btn": StyleProps;
                };
                "--dlk-pgs-ckt-accs-addr": {
                    "--dlk-pgs-ckt-accs-addr-styles": StyleProps;
                    "--dlk-pgs-ckt-accs-addr-trig": {
                        "--dlk-pgs-ckt-accs-addr-trig-styles": StyleProps;
                        "--dlk-pgs-ckt-accs-addr-trig-txt": StyleProps;
                        "--dlk-pgs-ckt-accs-addr-trig-icn": StyleProps;
                    };
                    "--dlk-pgs-ckt-accs-addr-mdl": {
                        "--dlk-pgs-ckt-accs-addr-mdl-styles": StyleProps;
                    };
                    "--dlk-pgs-ckt-accs-addr-btn": StyleProps;
                };
                "--dlk-pgs-ckt-accs-shp": {
                    "--dlk-pgs-ckt-accs-shp-styles": StyleProps;
                };
                "--dlk-pgs-ckt-accs-pmt": {
                    "--dlk-pgs-ckt-accs-pmt-styles": StyleProps;
                };
            };
            "--dlk-pgs-ckt-gft": {
                "--dlk-pgs-ckt-gft-styles": StyleProps;
                "--dlk-pgs-ckt-gft-inp": StyleProps;
                "--dlk-pgs-ckt-gft-btn": StyleProps;
            };
            "--dlk-pgs-ckt-smry": {
                "--dlk-pgs-ckt-smry-styles": StyleProps;
                "--dlk-pgs-ckt-smry-hdr": StyleProps;
                "--dlk-pgs-ckt-smry-sep": StyleProps;
                "--dlk-pgs-ckt-smry-itm": {
                    "--dlk-pgs-ckt-smry-itm-styles": StyleProps;
                    "--dlk-pgs-ckt-smry-itm-img": StyleProps;
                    "--dlk-pgs-ckt-smry-itm-ttl": StyleProps;
                    "--dlk-pgs-ckt-smry-itm-qty": StyleProps;
                    "--dlk-pgs-ckt-smry-itm-prc": StyleProps;
                };
            };
            "--dlk-pgs-ckt-totl": {
                "--dlk-pgs-ckt-totl-styles": StyleProps;
                "--dlk-pgs-ckt-totl-itm": {
                    "--dlk-pgs-ckt-totl-itm-styles": StyleProps;
                    "--dlk-pgs-ckt-totl-itm-ttl": StyleProps;
                    "--dlk-pgs-ckt-totl-itm-prc": StyleProps;
                };
            };
        };
    };
}
export interface IAdditionalLinkes {
    caption: string;
    link: string;
    save: boolean;
}

export interface IShopDesignPage {
    templateID?: string
    backgroundImage?: string
    backgroundImageSecondary?: string
    fullWidthHero?: boolean
    productSectionText?: string
    backgroundColor?: string
    backgroundText?: string
    logo?: string
    discordURL?: string
    instagramURL?: string
    twitterURL?: string
    facebookURL?: string
    linkedinURL?: string
    tiktokURL?: string
    webURL?: string
    telegramURL?: string
    youtubeURL?: string
    messengerURL?: string
    headerIcon?: string
    shopDesign?: {
        fontfamily?: string;
        headerBackground?: string;
        isHeaderFixed?: boolean;
        hiroLayout?: string;
        hiroTextColor?: string;
        bannerLinks?: Array<IAdditionalLinkes>;
        footerLinks?: Array<IAdditionalLinkes>;
        productListTitle?: string;
        iconHeaderColor?: string;
        foreground?: string;
        backgroundBody?: string;
        textColorParagraphs?: string;
    };
    template_options?: ITemplateOptions;
}

export interface IStateDesignPage {
    device?: "desktop" | "mobile";
    optionSelected?: IPreviewSections;
    shop?: IShopDesignPage;
}

export type actionsDesignPage =
    | {
          type: "updateState";
          params: IStateDesignPage;
      }
    | {
          type: "updateShop";
          params: IShopDesignPage;
      };

namespace designPageReducer {
    export const reducers = (state: IStateDesignPage, actions: actionsDesignPage): IStateDesignPage => {
        if (actions.type === "updateState") {
            return {
                ...state,
                ...actions.params,
            };
        } else if (actions.type === "updateShop") {
            return {
                ...state,
                shop: actions.params.shopDesign
                    ? {
                          ...state.shop,
                          shopDesign: {
                              ...state.shop.shopDesign,
                              ...actions.params.shopDesign,
                          },
                      }
                    : {
                          ...state.shop,
                          ...actions.params,
                      },
            };
        } else return state;
    };
}

export default designPageReducer;
