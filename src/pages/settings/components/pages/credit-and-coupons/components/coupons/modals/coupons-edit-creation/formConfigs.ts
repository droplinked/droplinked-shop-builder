import { Coupon } from "../../interface";
import * as Yup from "yup";

export interface CouponFormValues {
    name: string
    quantity: number | null
    balance: number | null
    expiryDate: Date | null
    type: "DISCOUNT" | "CREDIT"
}

export const getInitialValues = (coupon: Coupon) => {
    const { balance, codes, expiryDate, name, type } = coupon ?? {}

    return {
        name: name || "",
        quantity: codes?.length || null,
        balance: balance || null,
        expiryDate: expiryDate || null,
        type: type || "DISCOUNT"
    }
}

export const getValidationSchema = ({ isEdit }: { isEdit: boolean }) => {
    if (isEdit) {
        return (
            Yup.object().shape({
                name: Yup.string().required("Title is Required"),
                quantity: Yup.number().typeError("Must be Number").required("Quantity is Required"),
                type: Yup.string().required("Type is Required"),
                balance: Yup.number().typeError("Must be Number").required("Amount is Required"),
                expiryDate: Yup.date()
                    .required("Expiry Date is Required")
                    .nullable(),
            })
        )
    } else {
        return (
            Yup.object().shape({
                name: Yup.string().required("Title is Required"),
                quantity: Yup.number().required("Quantity is Required"),
                type: Yup.string().required("Type is Required"),
                balance: Yup.number().required("Amount is Required"),
                expiryDate: Yup.date()
                    .required("Expiry Date is Required")
                    .min(new Date(), "Expiry date must be in the future")
                    .nullable(),
            })
        )
    }
}