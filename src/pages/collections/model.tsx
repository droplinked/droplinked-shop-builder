import { ITableRows } from 'components/common/table/AppTable'
import React from "react"
import ControlsListCollection from "./parts/controls/Controls"

interface IrefactorData {
    data: any
    fetch: Function
    search: string
}
export default class CollectionsModel {

    private static makeData = (element: any, fetch: any) => ({
        title: {
            value: element.title
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
    })


    static refactorData = ({ data, fetch, search }: IrefactorData): Array<ITableRows> => {
        search = search && search.toLowerCase()
        const products = search ? data.filter((el: any) => el?.title && el.title.toLowerCase().includes(search)) : data
        return products.map((el: any): ITableRows => this.makeData(el, fetch))
    }
}