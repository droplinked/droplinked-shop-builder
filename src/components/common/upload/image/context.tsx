import { createContext } from "react";

interface IProps {
    values: Array<string> | string
    openFile: Function
    deleted(name: string): void
    isLoading: boolean
}

const appUploadImageContext = createContext<IProps>({
    values: [],
    openFile: () => { },
    deleted: () => { },
    isLoading: false
})

export default appUploadImageContext