interface Iupdate {
    payments: any
    key: string
    value: string
    type: string
}

export default class ContainerPaymentModel {
    static update = ({ key, payments, value, type }: Iupdate) => {
        return payments.map((el: any) => (el.type === type ? {
            ...el,
            [key]: value
        } : el))
    }
}