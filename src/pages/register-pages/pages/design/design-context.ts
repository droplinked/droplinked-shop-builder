import { createContext } from "react";

interface IState {
  device: "desktop" | "mobile"
}

interface IProps {
  state: IState
  methods: {
    updateState: Function
    resetState: Function
  }
}

export const initialStateDesignPage: IState = {
  device: "desktop"
}

export interface IDesignPageStates {
  state: IState
}

export const designContext = createContext<IProps>({
  state: initialStateDesignPage,
  methods: {
    updateState: () => { },
    resetState: () => { },
  }
});
