import { ITableRows } from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import React from "react"
import CollectionProductList from './parts/collection/CollectionProductList'
import ControlsListProduct from "./parts/controls/Controls"
import ImageListProduct from "./parts/image/ImageListProduct"
import InventoryStatus from './parts/status/InventoryStatus'

interface IrefactorData {
    data: []
    fetch: Function
    search: string
}
const ProductListModel = ({
    makeData: (element: any, fetch: any): ITableRows => {
        return {
            _data: element,
            image: {
                caption: "Name",
                value: <ImageListProduct product={element} />
            },
            collection: {
                value: <CollectionProductList data={element} />
            },
            type: {
                value: <AppTypography size='12px'>{element?.product_type}</AppTypography>
            },
            inventory: {
                caption: "Inventory Status",
                value: <InventoryStatus data={element} />
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