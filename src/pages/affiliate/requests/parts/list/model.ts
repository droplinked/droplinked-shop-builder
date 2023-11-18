const requestsModel = ({
    getVariant: (sku: any): any => {
        const result = {}
        sku?.options.forEach((element: any) => {
            result[element.variantID === "62a989ab1f2c2bbc5b1e7153" ? 'color' : 'size'] = element
        })
        return result
    }
})

export default requestsModel