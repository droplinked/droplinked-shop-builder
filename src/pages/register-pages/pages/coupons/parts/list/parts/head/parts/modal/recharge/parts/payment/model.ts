import * as Yup from 'yup'

namespace rechargePaymentModel {
    export const formSchema = Yup.object().shape({
        amount: Yup.number().min(1).required('Required')
    });
}

export default rechargePaymentModel