import React from "react"
import { ITableRows } from "components/shared/table/AppTable"
import { calculateHowTimePassed } from "pages/admin-pages/orders-page/components/order-component/order-component-utils"
import ControlsListOrder from "./parts/controls/Controls"

interface IrefactorData {
    data: any
}
export default class OrdersModel {
    static refactorData = ({ data }: IrefactorData): Array<ITableRows> => {
        return data.map((el: any): ITableRows => ({
            Code: {
                value: el?._id
            },
            Customer: {
                value: `${el?.customerAddressBook?.firstName} ${el?.customerAddressBook?.lastName}`
            },
            Date: {
                value: calculateHowTimePassed(el?.createdAt)
            },
            Items: {
                value: el?.items?.length
            },
            Status: {
                value: el?.status
            },
            options: {
                caption: "",
                value: <ControlsListOrder order={el} />
            }
        }))
    }
}