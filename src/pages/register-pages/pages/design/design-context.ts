import { createContext } from "react";
import { actionsDesignPage, IStateDesignPage } from "./reducer";

interface IProps {
  state: IStateDesignPage
  methods: {
    dispatch(action: actionsDesignPage): void
    resetState: Function
  }
}

export const template_options_defaults = {
  '--dlk-hdr': {
    '--dlk-hdr-styles': {},
    '--dlk-hdr-container': {},
    '--dlk-hdr-logo': {},
    '--dlk-hdr-icons': {
      '--dlk-hdr-icons-styles': {},
      '--dlk-hdr-icons-profile': {},
      '--dlk-hdr-icons-cart': {},
      '--dlk-hdr-icons-notification': {}
    }
  },
  '--dlk-wrp': {
    '--dlk-wrp-styles': {},
    '--dlk-wrp-hiro': {
      '--dlk-wrp-hiro-styles': {},
      '--dlk-wrp-hiro-image': {},
      '--dlk-wrp-hiro-caption': {}
    }
  },
  '--dlk-ftr': {
    '--dlk-ftr-styles': {},
    '--dlk-ftr-logo': {},
    '--dlk-ftr-description': {}
  }
}

export const initialStateDesignPage: IStateDesignPage = {
  device: "desktop",
  optionSelected: null,
  shop: {
    templateID: '6523b829f31b22884436a8da',
    backgroundText: '',
    logo: '',
    discordURL: '',
    instagramURL: '',
    twitterURL: '',
    facebookURL: '',
    linkedinURL: '',
    tiktokURL: '',
    webURL: '',
    telegramURL: '',
    youtubeURL: '',
    messengerURL: '',
    headerIcon: '',
    backgroundColor: '#141414',
    backgroundImage: '',
    backgroundImageSecondary: '',
    fullWidthHero: false,
    productSectionText: '',
    shopDesign: {
      fontfamily: '',
      headerBackground: '',
      hiroLayout: 'right',
      hiroTextColor: '',
      bannerLinks: [],
      footerLinks: [],
      iconHeaderColor: "#ffffff",
      backgroundBody: '',
      foreground: '',
      textColorParagraphs: '',
    },
    template_options: template_options_defaults
  }
}

export const designContext = createContext<IProps>({
  state: initialStateDesignPage,
  methods: {
    dispatch: null,
    resetState: () => { },
  }
});
