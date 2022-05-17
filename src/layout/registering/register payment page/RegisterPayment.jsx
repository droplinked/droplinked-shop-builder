import "./RegisterPayment.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import PaymentForm from "./payment-form/PaymentForm"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');

function RegisterPayment() {
    const options = { clientSecret: '{{CLIENT_SECRET}}' }

    return (
        <RegisterStructure>
            <Elements stripe={stripePromise} options={options}>
                <PaymentForm />
            </Elements>
        </RegisterStructure>
    )
}
export default RegisterPayment