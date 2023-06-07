interface IPODProperties {
    pod_blank_product_id: string
    providers: any
}

export interface IPODPropertiesOutput {
    colors: Array<{
        name: string
        code: string
    }>
    sizes: Array<any>
}

export class PODPropertiesModel {
    static getProperties = ({ pod_blank_product_id, providers }: IPODProperties): IPODPropertiesOutput => {
        let result: IPODPropertiesOutput = {
            colors: [],
            sizes: [],
        }

        Object.keys(providers).forEach(element => {
            result.colors.push({
                name: element,
                code: "#" + providers[element]?.pms_color_code
            })
            providers[element]?.sizes.forEach((size: any) => {
                if (!result.sizes.includes(size)) result.sizes.push(size)
            });
        });

        return result
    }
}