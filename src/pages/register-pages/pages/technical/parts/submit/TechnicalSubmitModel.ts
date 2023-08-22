import { IpaymentCreateService } from 'lib/apis/shop/interfaces';

interface Irefactor {
    payments: Array<IpaymentCreateService>
    userPayments: Array<IpaymentCreateService>
}

const TechnicalSubmitModel = ({
    refactor: ({ payments, userPayments }: Irefactor): Array<IpaymentCreateService> => {
        const userPaymentsTypes = Object.keys(userPayments).map(el => userPayments[el].type)
        return payments.filter((el) => el.isActive || userPaymentsTypes.includes(el.type))
    }
})

export default TechnicalSubmitModel