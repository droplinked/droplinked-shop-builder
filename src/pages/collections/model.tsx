import { ITableRows } from 'components/common/table/AppTable'
import React from "react"
import ControlsListCollection from "./parts/controls/Controls"

interface IrefactorData {
    data: any
    fetch: Function
    search: string
}

const CollectionsModel = {

    makeData: (element: any, fetch: any) => {
        const ruleSet = element?.ruleSets && element.ruleSets[0];
        const discount = ruleSet?.rules[0]?.discountPercentage || "-";
        const nftCount = ruleSet?.rules[0]?.nftsCount || "-";
        const totalNftCount = ruleSet?.rules?.reduce((acc, rule) => acc + rule.nftsCount, 0);
        const rulesetsValue = ruleSet ? `%${discount} discount on minimum ${nftCount} NFT out of ${totalNftCount}` : "-";

        return {
            Collection: {
                value: element?.title,
                image: element?.image,
            },
            rulesets: {
                value: rulesetsValue
            },
            Products: {
                value: element.productCount || "-"
            },
            controls: {
                props: {
                    width: "70px"
                },
                caption: "",
                value: <ControlsListCollection collection={element} fetch={fetch} />
            }
        };
    },

    refactorData: ({ data, fetch, search }: IrefactorData): Array<ITableRows> => {
        search = search && search.toLowerCase()
        const products = search ? data.filter((el: any) => el?.title && el.title.toLowerCase().includes(search)) : data
        return products.map((el: any): ITableRows => CollectionsModel.makeData(el, fetch))
    }
}

export default CollectionsModel
