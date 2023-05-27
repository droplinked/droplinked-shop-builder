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
};

export const designContext = createContext({
  state: initialStatesDesign,
  methods: {
    updateState: () => {},
    resetState: () => {},
  }
});
