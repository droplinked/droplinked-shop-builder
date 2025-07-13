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

export const getValidationSchema = ({ isEdit, t }: { isEdit: boolean, t: (key: string) => string }) => {
    if (isEdit) {
        return (
            Yup.object().shape({
                name: Yup.string().required(t("settings.coupons.form.validation.titleRequired")),
                quantity: Yup.number().typeError(t("settings.coupons.form.validation.mustBeNumber")).required(t("settings.coupons.form.validation.quantityRequired")),
                type: Yup.string().required(t("settings.coupons.form.validation.typeRequired")),
                balance: Yup.number().typeError(t("settings.coupons.form.validation.mustBeNumber")).required(t("settings.coupons.form.validation.amountRequired")),
                expiryDate: Yup.date()
                    .required(t("settings.coupons.form.validation.expiryDateRequired"))
                    .nullable(),
            })
        )
    } else {
        return (
            Yup.object().shape({
                name: Yup.string().required(t("settings.coupons.form.validation.titleRequired")),
                quantity: Yup.number().required(t("settings.coupons.form.validation.quantityRequired")),
                type: Yup.string().required(t("settings.coupons.form.validation.typeRequired")),
                balance: Yup.number()
                    .when("type", {
                        is: (value: string) => value === "DISCOUNT",
                        then: (schema) => schema.integer(t("settings.coupons.form.validation.validNumber"))
                            .min(1, t("settings.coupons.form.validation.minDiscount"))
                            .max(100, t("settings.coupons.form.validation.maxDiscount"))
                            .required(""),
                        otherwise: (schema) => schema.required(t("settings.coupons.form.validation.amountRequired")),
                    }),
                expiryDate: Yup.date()
                    .required(t("settings.coupons.form.validation.expiryDateRequired"))
                    .min(new Date(), t("settings.coupons.form.validation.futureDateRequired"))
                    .nullable(),
            })
        )
    }
}