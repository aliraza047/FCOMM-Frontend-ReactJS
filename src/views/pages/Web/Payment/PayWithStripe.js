import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { stripe_publish } from 'utils/config';

const CheckoutForm2 = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (elements == null) {
            return;
        }

        const res = await stripe.createToken({
            card: {
                number: '4242424242424242',
                exp_month: 2,
                exp_year: 2023,
                cvc: '314'
            }
        });
        console.log('Submit', res, elements.getElement(CardElement));
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};

const stripePromise = loadStripe(
    stripe_publish
);

export const PayWithStripe = ({ visible, setVisible }) => {
    const handleClose = () => {
        setVisible(false);
    };
    return (
        <div className="stripeMain">
            <Dialog
                open={visible}
                onClose={handleClose}
                maxWidth="xl"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="customModalMain stripeModalMain"
            >
                <DialogContent className="customModal">
                    <Elements className="customStripe" stripe={stripePromise}>
                        <CheckoutForm setVisible={setVisible} />
                    </Elements>
                </DialogContent>
            </Dialog>
        </div>
    );
};
