import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Post } from '../services/user.services';

const GooglePay = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);
    // const [messages, addMessage] = useMessages();

    useEffect(() => {
        if (!stripe || !elements) {
            return;
        }

        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                "amount": 2000,
                "label": "content",
                "customer_id": "cus_OKeSANByqSaraj"
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        // Check the availability of the Payment Request API.
        pr.canMakePayment()
        .then(result => {
            if (result) {
                // console.log("result1231231", result)
                setPaymentRequest(pr);
            }
        })
        .catch((error) => {
            // console.log('error12312', error)
        })

        // console.log('paymentRequest', pr);

        pr.on('paymentmethod', async (e) => {
            const resp = await Post('/mediahouse/createPayment', {
                "amount": 2000,
                "type": "content",
                "customer_id": "cus_OKeSANByqSaraj"
            })
            // console.log("resp1231231", resp)

            const { paymentIntent } = await stripe.confirmCardPayment('sk_test_51NITL2AKmuyBTjDNklngpSDGnQK7JQjVzXh5cZdzyeAKf0zJiloShxogUofJ8417gRCn83SmyGx0Bz5cqhusNP1S00fIDDFmW9', {
                payment_method: e.paymentMethod.id,
            }, { handleActions: false });

            // console.log('paymentIntent', paymentIntent)

            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            // console.log(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
        });
    }, [stripe, elements]);


    return (
        <>
            <h1>Google Pay</h1>

            <p>
                Before you start, you need to:
                <ul>
                    <li><a href="https://stripe.com/docs/stripe-js/elements/payment-request-button#html-js-testing" target="_blank">Add a payment method to your browser.</a> For example, add a card to your Google Pay settings.</li>
                    <li>Serve your application over HTTPS. This is a requirement both in development and in production. One way to get up and running is to use a service like <a href="https://ngrok.com/" target="_blank" rel="noopener noreferrer">ngrok</a>.</li>
                </ul>
            </p>

            <a href="https://stripe.com/docs/stripe-js/elements/payment-request-button" target="_blank">Stripe Documentation</a>

            {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}

            {
                // console.log('paymentRequest', paymentRequest)
            }

            {/* <StatusMessages messages={messages} /> */}
        </>
    );
};

export default GooglePay;