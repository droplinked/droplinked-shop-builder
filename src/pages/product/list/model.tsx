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
const ProductListModel = ({
    makeData: (element: any, fetch: any) => {
        const publish_status = element?.publish_status
        return {
            image: {
                caption: "Name",
                value: <ImageListProduct product={element} />
            },
            collection: {
                value: element?.productCollectionID?.title
            },
            inventory: {
                caption: "Inventory Status",
                value: "---"
            },
            status: {
                value: publish_status === "PUBLISHED" ? "Published" : "Draft"
            },
            controls: {
                caption: "",
                value: <ControlsListProduct product={element} productID={element._id} fetch={fetch} />
            }
        }
    },

    refactorData: ({ data, fetch, search }: IrefactorData): Array<ITableRows> => {
        search = search && search.toLowerCase()
        const products = search ? data.filter((el: any) => el?.title && el.title.toLowerCase().includes(search)) : data
        return products.map((el: any): ITableRows => ProductListModel.makeData(el, fetch))
    }
})
export default ProductListModel