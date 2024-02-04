import React from "react"
import { ITableRows } from 'components/common/table/AppTable'
import ControlsListOrder from "./parts/controls/Controls"
import { convertToStandardFormat } from "lib/utils/date.utils/convertDate";

interface IrefactorData {
    data: any
    search: string
}
export default class OrdersModel {

    static calculateHowTimePassed = (baseTime: string) => {
        const now = new Date();
        const yourDate = new Date(baseTime);

        const timePassed = (now.getTime() - yourDate.getTime());

        const secondsPassed = Math.floor(timePassed / 1000);
        const minutesPassed = Math.floor(secondsPassed / 60);
        const hoursPassed = Math.floor(minutesPassed / 60);
        const daysPassed = Math.floor(hoursPassed / 24);
        const monthsPassed = Math.floor(daysPassed / 30);

        if (minutesPassed < 1) {
            return "now";
        } else if (hoursPassed < 1) {
            return `${minutesPassed} minutes`;
        } else if (daysPassed < 1) {
            return `${hoursPassed} hours`;
        } else {
            return convertToStandardFormat(yourDate.getTime());
        }
    };

    static makeData = (element: any) => ({
        Code: {
            caption: "Order ID",
            value: element?._id
        },
        Customer: {
            value: `${element?.customerAddressBook?.firstName} ${element?.customerAddressBook?.lastName}`
        },
        Date: {
            caption: "Date Created",
            value: this.calculateHowTimePassed(element?.createdAt)
        },
        Quantity: {
            value: element?.items?.length
        },
        Status: {
            caption: "Delivery Status",
            value: element?.status
        },
        options: {
            caption: "",
            value: <ControlsListOrder order={element} />
        }
    })

    static refactorData = ({ data,search }: IrefactorData): Array<ITableRows> => {
        search = search && search.toLowerCase()
        const products = search ? data.filter((el: any) => el?._id && el._id.toLowerCase().includes(search)) : data
        return products.map((el: any): ITableRows => this.makeData(el))
    }
}