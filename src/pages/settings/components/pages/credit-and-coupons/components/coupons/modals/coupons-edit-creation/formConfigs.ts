import { PriceConversionParams } from "hooks/useCurrencyConverter/useCurrencyConverter";
import { Coupon } from "../../interface";
import * as Yup from "yup";

export interface CouponFormValues {
    name: string
    quantity: number | null
    balance: number | null
    expiryDate: Date | null
    type: "DISCOUNT" | "CREDIT"
}

interface InitialValues {
    coupon: Coupon,
    convertPrice: ({ amount, toUSD }: PriceConversionParams) => Number
}

export const getInitialValues = ({ coupon, convertPrice }: InitialValues) => {
    const { balance, codes, expiryDate, name, type } = coupon ?? {}
    const convertedPrice = convertPrice({ amount: balance, toUSD: false }).toFixed(2)
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);

    return {
        name: name || "",
        quantity: codes?.length || null,
        balance: (type === "CREDIT" ? convertedPrice : balance) || null,
        expiryDate: expiryDate || midnight,
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
                balance: Yup.number()
                    .when("type", {
                        is: (value: string) => value === "DISCOUNT",
                        then: (schema) => schema.integer("Must be a valid number").min(1, "Min is 1").max(100, "Max 100").required(""),
                        otherwise: (schema) => schema.required("Amount is Required"),
                    }),
                expiryDate: Yup.date()
                    .required("Expiry Date is Required")
                    .min(new Date(), "Expiry date must be in the future")
                    .nullable(),
            })
        )
    }
}