import { ITableRows } from "components/shared/table/AppTable"
import React from "react"
import ControlsListCollection from "./parts/controls/Controls"

interface IrefactorData {
    data: any
    fetch: Function
}
export default class CollectionsModel {
    static refactorData = ({ data, fetch }: IrefactorData): Array<ITableRows> => {
        return data.map((el: any): ITableRows => ({
            Collection: {
                value: el.title
            },
            Products: {
                value: el?.products?.[0]?.title || "-"
            },
            controls: {
                props:{
                    width: "70px"
                },
                caption: "",
                value: <ControlsListCollection collection={el} fetch={fetch} />
            }
        }))
    }
}