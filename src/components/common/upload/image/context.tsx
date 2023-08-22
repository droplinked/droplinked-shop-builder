import { createContext } from "react";

export type ImodeUploadImage = "multi" | "single"

export interface IUploadImageDefault {
    value: string
    updateDefault(url: string): void
}

interface IProps {
    values: Array<string> | string
    openFile: Function
    deleted(name: string): void
    isLoading: boolean
    mode: ImodeUploadImage
    defaults: IUploadImageDefault
}

const appUploadImageContext = createContext<IProps>({
    values: [],
    openFile: () => { },
    deleted: () => { },
    isLoading: false,
    mode: "multi",
    defaults: {
        value: null,
        updateDefault: () => { }
    }
})

export default appUploadImageContext