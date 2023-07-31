import { createContext } from "react";

export type ImodeUploadImage = "multi" | "single"

interface IProps {
    values: Array<string> | string
    openFile: Function
    deleted(name: string): void
    isLoading: boolean
    mode: ImodeUploadImage
}

const appUploadImageContext = createContext<IProps>({
    values: [],
    openFile: () => { },
    deleted: () => { },
    isLoading: false,
    mode: "multi"
})

export default appUploadImageContext