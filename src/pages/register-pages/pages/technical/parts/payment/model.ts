interface ImakePayments {
    paymentMethods: any
    paymentPublic: any
}

const technicalPaymentsModel = ({
    makePayments: ({ paymentMethods, paymentPublic }: ImakePayments) => {
        return paymentPublic?.map((payment: any) => {
            const correspondingMethod = paymentMethods?.find(method => method.type === payment.type)
            return {
                ...payment,
                destinationAddress: correspondingMethod?.destinationAddress || "",
                isActive: correspondingMethod?.isActive || false,
                tokens:
                    payment.tokens?.map(token => (
                        {
                            ...token,
                            isActive: (correspondingMethod?.tokens.find(currentToken => currentToken.type === token.type)?.isActive || false)
                        }
                    ))
                    || []
            }
        })
    }
})

export default technicalPaymentsModel