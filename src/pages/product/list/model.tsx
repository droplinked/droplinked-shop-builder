import { ITableRows } from "components/shared/table/AppTable"
import React from "react"
import ControlsListProduct from "./parts/controls/Controls"
import ImageListProduct from "./parts/image/ImageListProduct"

interface IrefactorData {
    data: any
    fetch: Function
}
export default class ProductListModel {
    static refactorData = ({ data, fetch }: IrefactorData): Array<ITableRows> => {
        return data.map((el: any): ITableRows => ({
            image: {
                caption: "Products",
                value: <ImageListProduct product={el} />
            },
            collections: {
                value: el.productCollectionID.title
            },
            inventory: {
                caption: "Inventory status",
                value: "---"
            },
            controls: {
                caption: "",
                value: <ControlsListProduct productID={el._id} fetch={fetch} />
            }
        }))
    }
}