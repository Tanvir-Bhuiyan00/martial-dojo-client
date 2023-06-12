import { loadStripe } from "@stripe/stripe-js";
import useSelectedClasses from "../../../hooks/useSelectedClasses";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_stripe);
const Payment = () => {
  const [cart] = useSelectedClasses();
  const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);
  const price = parseInt(total.toFixed(2));
  return (
    <div className="w-96 mx-64 mt-20">
      <h1 className="text-5xl font-display font-bold text-center mb-10">Pay Here</h1>
      <Elements stripe={stripePromise}>
        <Checkout cart={cart} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
