import React from "react"
import { ITableRows } from "components/shared/table/AppTable"
import ControlsListOrder from "./parts/controls/Controls"
import { convertToStandardFormat } from "lib/utils/date.utils/convertDate";

interface IrefactorData {
    data: any
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

    static refactorData = ({ data }: IrefactorData): Array<ITableRows> => {
        return data.map((el: any): ITableRows => ({
            Code: {
                value: el?._id
            },
            Customer: {
                value: `${el?.customerAddressBook?.firstName} ${el?.customerAddressBook?.lastName}`
            },
            Date: {
                value: this.calculateHowTimePassed(el?.createdAt)
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