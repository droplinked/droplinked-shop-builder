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
                name: Yup.string().required(t("validationHandlers.validation.titleRequired")),
                quantity: Yup.number().typeError(t("validationHandlers.validation.mustBeNumber")).required(t("validationHandlers.validation.quantityRequired")),
                type: Yup.string().required(t("validationHandlers.validation.typeRequired")),
                balance: Yup.number().typeError(t("validationHandlers.validation.mustBeNumber")).required(t("validationHandlers.validation.amountRequired")),
                expiryDate: Yup.date()
                    .required(t("validationHandlers.validation.expiryDateRequired"))
                    .nullable(),
            })
        )
    } else {
        return (
            Yup.object().shape({
                name: Yup.string().required(t("validationHandlers.validation.titleRequired")),
                quantity: Yup.number().required(t("validationHandlers.validation.quantityRequired")),
                type: Yup.string().required(t("validationHandlers.validation.typeRequired")),
                balance: Yup.number()
                    .when("type", {
                        is: (value: string) => value === "DISCOUNT",
                        then: (schema) => schema.integer(t("validationHandlers.validation.validNumber"))
                            .min(1, t("validationHandlers.validation.minDiscount"))
                            .max(100, t("validationHandlers.validation.maxDiscount"))
                            .required(""),
                        otherwise: (schema) => schema.required(t("validationHandlers.validation.amountRequired")),
                    }),
                expiryDate: Yup.date()
                    .required(t("validationHandlers.validation.expiryDateRequired"))
                    .min(new Date(), t("validationHandlers.validation.futureDateRequired"))
                    .nullable(),
            })
        )
    }
}