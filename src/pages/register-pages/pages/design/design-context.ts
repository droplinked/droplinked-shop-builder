import { createContext } from "react";
import { actionsDesignPage, IStateDesignPage } from "./reducer";

interface IProps {
  state: IStateDesignPage
  methods: {
    dispatch(action: actionsDesignPage): void
    resetState: Function
  }
}

export const initialStateDesignPage: IStateDesignPage = {
  device: "desktop",
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
    headerIcon: '',
    backgroundColor: '',
    backgroundImage: '',
    backgroundImageSecondary: '',
    fullWidthHero: false,
    productSectionText: '',
    shopDesign: {
      fontfamily: '',
      headerBackground: '',
      hiroLayout: '',
      profileLogo: '',
      hiroTextColor: ''
    }
  }
}

export const designContext = createContext<IProps>({
  state: initialStateDesignPage,
  methods: {
    dispatch: null,
    resetState: () => { },
  }
});
