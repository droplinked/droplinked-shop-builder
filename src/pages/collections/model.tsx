import { ITableRows } from 'components/common/table/AppTable'
import { Collection } from "lib/apis/collection/interfaces"
import React from "react"
import ControlsListCollection from "./parts/controls/Controls"
import CollectionRulesetColumn from './parts/ruleset-column/CollectionRulesetColumn'
import CollectionTitleColumn from './parts/title-column/CollectionTitleColumn'

interface IrefactorData {
    data: any
    fetch: Function
    search: string
}

const CollectionsModel = {
    makeData: (element: any, fetch: any) => {
        const ruleSet = element?.ruleSets && element.ruleSets[0];

        return {
            Collection: {
                value: <CollectionTitleColumn collection={element} />
            },
            rulesets: {
                value: ruleSet ? <CollectionRulesetColumn ruleset={ruleSet} /> : "-"
            },
            Products: {
                value: element.productsCount || "-"
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
        const products = search ? data.filter((collection: Collection) => collection.title.toLowerCase().includes(search)) : data
        return products.map((el: any): ITableRows => CollectionsModel.makeData(el, fetch))
    }
}

export default CollectionsModel