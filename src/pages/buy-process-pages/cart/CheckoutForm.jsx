// import {useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { useNavigate } from "react-router-dom";
// import {useToasty} from "../../../context/toastify/ToastContext"
// import CardSection from './CardSection';


// export default function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   let navigate = useNavigate();
//   const { errorToast }  = useToasty()

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make  sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     const result = await stripe.createToken(card);
      
//     if (result.error) {
//       // Show error to your customer.
//       errorToast(result.error.message);
//     } else {
//       // Send the token to your server.
//       // This function does not exist yet; we will define it in the next step.
//      // stripeTokenHandler(result.token);
//     //  console.log(card);
//     //  console.log(result);
//     localStorage.setItem('selected-cart', JSON.stringify({selectedCart : result.token.card}))
//       localStorage.setItem('cart-id', JSON.stringify({cartId : result.token.id}))
//      navigate('/confirm')
//     }
//   };

//   return (
    
//     <form onSubmit={handleSubmit} style={{width:'100%'}}>
//       <CardSection />
//       <button className="stripe-cart-component" >Enter card</button>
//     </form>
   
//   );
// }