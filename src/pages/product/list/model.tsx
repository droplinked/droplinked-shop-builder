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
                value: <AppTypography fontSize='12px'>{element?.product_type}</AppTypography>
            },
            inventory: {
                caption: "Status",
                value: <InventoryStatus data={element} />
            },
            controls: {
                caption: "",
                value: <ControlsListProduct product={element} productID={element._id} fetch={fetch} />
            }
        }
    },

    getMain: (product: any) => product.media.find(el => el.isMain === 'true')?.thumbnail,

    refactorData: ({ data, fetch }: IrefactorData): Array<ITableRows> => {
        return data.map((el: any): ITableRows => ProductListModel.makeData(el, fetch))
    }
})
export default ProductListModel