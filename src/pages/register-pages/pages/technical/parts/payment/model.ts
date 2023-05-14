interface ImakePayments {
    paymentMethods: any
    paymentPublic: any
}

interface Ifind {
    type: string
    paymentMethods: any
}


export default class technicalPaymentsModel {
    private static find = ({ paymentMethods, type }: Ifind) => paymentMethods.filter((el: any) => el.type === type)[0]

    static makePayments = ({ paymentMethods, paymentPublic }: ImakePayments) => {

        const result = paymentPublic.map((el: any) => {
            const findElement: any = this.find({
                paymentMethods: paymentMethods,
                type: el
            })

            return {
                type: el,
                destinationAddress: findElement ? findElement.destinationAddress || "" : "",
                isActive: findElement ? findElement.isActive || false : false
            }
        })

        return result
    }
}