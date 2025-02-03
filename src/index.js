import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.scss';
import './new-style.scss';
import './responsive.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { axios_interceptor } from './services/user.services';
import 'react-toastify/dist/ReactToastify.min.css';
import { Slide, ToastContainer } from 'react-toastify';
import { requestForToken } from './component/firebase/NotificationToken';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { DarkModeProvider } from './context/DarkModeContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


axios_interceptor()
requestForToken()

const root = ReactDOM.createRoot(document.getElementById('root'));

document.addEventListener('DOMContentLoaded', async () => {
  // const { publishableKey } = await fetch('/config').then((r) => r.json());
  const stripePromise = loadStripe('pk_test_51NITL2AKmuyBTjDNLTxs7YjdUbe40lZYUoKLocUh1sxp0KADCAeETz2AczzxtSqG1UdFZ0HhxFSuTF5CVF2OLRHZ00aProJxkS');

  // ReactDOM.render(
  //   <React.StrictMode>
  //     <Elements stripe={stripePromise}>
  //       <App />
  //     </Elements>
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // );
  root.render(
    <Elements stripe={stripePromise}>
      <DarkModeProvider>
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
        transition={Slide}/>
        <App />
      </DarkModeProvider>
    </Elements>
  );
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
