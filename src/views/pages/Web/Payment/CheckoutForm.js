import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { isArrayCheck } from 'views/utilities/common';
import { addMethodArray, removeMethodArray } from 'utils/helper';
import { addNewStripeCard, editUser } from 'redux/action/User';
import { getMyProfile } from 'redux/action/Auth';
import { useSelector, useDispatch } from 'react-redux';
import CardSection from './CardSection';

export default function CheckoutForm({ setVisible }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state._auth);
    const [loading, setloading] = useState(false);
    const [hit, sethit] = useState(false);

    const handleSubmit = async (event) => {
        sethit(true);
        setVisible(false);
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        if (result.error) {
            // Show error to your customer.
            console.log(result.error.message);
        } else {
            // Send the token to your server.
            // This function does not exist yet; we will define it in the next step.
            console.log(result.token);
            handleAdd(result.token);
        }
    };
    const handleAdd = (res) => {
        const inputData = {
            token: res.id,
            cus_id: String(user?.user?.cus_id),
            name: user?.user?.fullname,
            cardId: res.card.id,
            zipCode: res.card.address_zip,
            brand: res.card.brand,
            country: res.card.country,
            exp_month: res.card.exp_month,
            exp_year: res.card.exp_year,
            last4: res.card.last4
        };
        console.log('Add');
        dispatch(addNewStripeCard(inputData, setVisible, setloading));
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            <div className="row flex-row justify-content-center">
                {!hit ? (
                    <button style={{ width: '100px', marginRight: 10 }} disabled={!stripe || loading}>
                        Cancel
                    </button>
                ) : (
                    <></>
                )}

                {!hit ? (
                    <button style={{ width: '100px' }} disabled={!stripe || loading}>
                        Add
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </form>
    );
}
