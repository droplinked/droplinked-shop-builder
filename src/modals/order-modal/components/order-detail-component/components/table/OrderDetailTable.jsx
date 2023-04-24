import AppTable from 'components/shared/table/AppTable'
import orderModalContext from 'modals/order-modal/context'
import React, { useContext } from 'react'
import OrderModalProduct from './parts/product/OrderModalProduct';

function OrderDetailTable() {
    const { order } = useContext(orderModalContext)

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
                        value: "---"
                    },
                    size: {
                        value: "---"
                    },
                    price : {
                        value: "$10.000"
                    }
                }
            }) : []}
        />
    )
}

export default OrderDetailTable