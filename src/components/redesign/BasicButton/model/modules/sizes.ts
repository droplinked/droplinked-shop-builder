import { IsizesHandel } from "../BasicButtonModel"

const BasicButtonSizes = ({
    large: (): IsizesHandel => {
        return {
            button: {
                padding: "10px 14px",
                height: "40px"
            },
            text: "14px"
        }
    },

    medium: (): IsizesHandel => {
        return {
            button: {
                padding: "10px 14px",
                height: "32px"
            },
            text: "12px"
        }
    },

    small: (): IsizesHandel => {
        return {
            button: {
                padding: "10px 14px",
                height: "24px"
            },
            text: "10px"
        }
    }
})

export default BasicButtonSizes