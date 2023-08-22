import { IsizesHandel } from "../BasicButtonModel"

const BasicButtonSizes = ({
    large : (): IsizesHandel => {
        return {
            button: {
                minWidth: "160px",
                height: "40px"
            },
            text: "16px"
        }
    },

    medium : (): IsizesHandel => {
        return {
            button: {
                minWidth: "120px",
                height: "32px"
            },
            text: "12px"
        }
    },

    small : (): IsizesHandel => {
        return {
            button: {
                minWidth: "103px",
                height: "24px"
            },
            text: "10px"
        }
    }
})

export default BasicButtonSizes