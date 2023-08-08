import { createContext } from "react";

export const initialStatesDesign = {
  logo: "",
  headerIcon: "",
  textColor: "#000",
  theme: "theme-2",
  backgroundText: "",
  backgroundImage: "",
  backgroundImageSecondary: "",
  backgroundColor: "#fff",
  productSectionText: "",
  fullWidthHero: false
};

interface IProps {
  state: any
  methods: {
    updateState: Function
    resetState: Function
  }
}

export const designContext = createContext<IProps>({
  state: initialStatesDesign,
  methods: {
    updateState: () => { },
    resetState: () => { },
  }
});
