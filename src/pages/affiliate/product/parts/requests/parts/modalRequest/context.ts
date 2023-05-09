import { Isku } from "lib/apis/product/interfaces";
import { createContext } from "react";

interface IModalRequestContext {
    product: any
    sku: any
    formik: {
        setFieldValue: any
        errors: any
        values: any
        [props: string]: any
    }
}
export const ModalRequestContext = createContext<IModalRequestContext>({
    product: null,
    sku: null,
    formik: null
})