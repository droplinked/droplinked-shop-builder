import AppTable from 'components/common/table/AppTable'
import orderModalContext from 'components/modals/order-modal/context'
import React, { useContext } from 'react'
import OrderModalProduct from './parts/product/OrderModalProduct';

function OrderDetailTable() {
    const { order } = useContext(orderModalContext)

    const pricePerItem = (item) => {
       return parseFloat(item?.totalPriceItem / item?.quantity ).toFixed(2)
    }

    return (
        <AppTable
            rows={order.items ? order.items.map(el => {
                return {
                    Product: {
                        props: {
                            width: "230px"
                        },
                        value: <OrderModalProduct product={el.product} />
                    },
                    quantity: {
                        value: el?.quantity
                    },
                    color: {
                        value: el?.color || "---"
                    },
                    size: {
                        value: el?.size || "---"
                    },
                    price : {
                        value: `$${pricePerItem(el)}`
                    }
                }
            }) : []}
        />
    )
}

export default OrderDetailTable