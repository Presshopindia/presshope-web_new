import RouteAll from "./pages/routes/RouteAll";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FacebookPixel from './components/FacebookPixel';
import { useEffect } from 'react';
import { onMessageListener } from './component/firebase/NotificationToken';
import NotificationPermission from './component/NotificationPermission';
import NotificationDebug from './component/NotificationDebug';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NITL2AKmuyBTjDNLTxs7YjdUbe40lZYUoKLocUh1sxp0KADCAeETz2AczzxtSqG1UdFZ0HhxFSuTF5CVF2OLRHZ00aProJxkS');

function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51NITL2AKmuyBTjDNklngpSDGnQK7JQjVzXh5cZdzyeAKf0zJiloShxogUofJ8417gRCn83SmyGx0Bz5cqhusNP1S00fIDDFmW9',
  };

  useEffect(() => {
    // Initialize foreground notification listener
    onMessageListener()
      .then((payload) => {
      })
      .catch((err) => {
      });
  }, []);

  return (
    <>
      <FacebookPixel />
      <NotificationPermission />
      <Elements stripe={stripePromise}>
        <RouteAll />
      </Elements>
    </>
  );
}

export default App;
