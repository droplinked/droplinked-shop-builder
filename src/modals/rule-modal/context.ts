import { createContext } from "react";

interface IruleModelContext {
    errors: any
    values: any
    setFieldValue(element: string, value: any): void
    loading: boolean
}
const ruleModelContext = createContext<IruleModelContext>({
    errors: null,
    values: null,
    setFieldValue: () => { },
    loading: true
})

export default ruleModelContext