import { createContext } from "react";

interface IruleModelContext {
    errors: any
    values: any
    setFieldValue(element: string, value: any): void
}
const ruleModelContext = createContext<IruleModelContext>({
    errors: null,
    values: null,
    setFieldValue: () => { }
})

export default ruleModelContext