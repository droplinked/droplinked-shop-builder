import { IsizesHandel } from "../BasicButtonModel"

export default class BasicButtonSizes {
    static large = (): IsizesHandel => {
        return {
            button: {
                minWidth: "160px",
                height: "40px"
            },
            text: "16px"
        }
    }

    static medium = (): IsizesHandel => {
        return {
            button: {
                minWidth: "120px",
                height: "32px"
            },
            text: "12px"
        }
    }

    static small = (): IsizesHandel => {
        return {
            button: {
                minWidth: "103px",
                height: "24px"
            },
            text: "10px"
        }
    }
}