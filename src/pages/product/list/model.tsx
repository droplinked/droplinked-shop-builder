import { ITableRows } from 'components/common/table/AppTable'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from "react"
import ControlsListProduct from "./parts/controls/Controls"
import ImageListProduct from "./parts/image/ImageListProduct"

interface IrefactorData {
    data: []
    fetch: Function
    search: string
}
export default class ProductListModel {
    private static makeData = (element: any, fetch: any) => ({
        image: {
            caption: "Products",
            value: <ImageListProduct product={element} />
        },
        collections: {
            value: element?.productCollectionID?.title
        },
        inventory: {
            caption: "Inventory status",
            value: "---"
        },
        status: {
            value: capitalizeFirstLetter(element?.publish_status)
        },
        controls: {
            caption: "",
            value: <ControlsListProduct product={element} productID={element._id} fetch={fetch} />
        }
    })

    static refactorData = ({ data, fetch, search }: IrefactorData): Array<ITableRows> => {
        search = search && search.toLowerCase()
        const products = search ? data.filter((el: any) => el?.title && el.title.toLowerCase().includes(search)) : data
        return products.map((el: any): ITableRows => this.makeData(el, fetch))
    }
}