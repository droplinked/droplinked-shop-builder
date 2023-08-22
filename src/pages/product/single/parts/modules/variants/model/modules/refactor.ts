import { Isku, IskuOption } from "lib/apis/product/interfaces"

interface IcheckAvailable {
    variants: any
    options: Array<IskuOption>
}

interface IfindByOptionSku {
    options: Array<IskuOption>
    skues: Array<Isku>
}

const VariantsRefactorModel = ({
    findByOptionSku: ({ options, skues }: IfindByOptionSku) => {
        return skues.find(el => JSON.stringify(el.options) === JSON.stringify(options))
    },

    checkAvailable: ({ options, variants }: IcheckAvailable) => {
        const blank_options = variants?.blank_options
        if (blank_options && blank_options[0]) {
            const getVariant = blank_options[0][options[0].value]
            const sizes = getVariant?.sizes
            return sizes && sizes.includes(options[1].value)
        }
        return false
    }
})

export default VariantsRefactorModel