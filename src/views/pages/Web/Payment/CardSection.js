import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { width } from '@mui/system';
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            iconColor: '#8c5d2f',
            color: '#000000',
            fontWeight: '500',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            borderBottomWidth: 5,
            ':-webkit-autofill': {
                color: '#8c5d2f'
            },
            '::placeholder': {
                color: '#8c5d2f'
            }
        },
        invalid: {
            iconColor: 'red',
            color: 'red'
        }
    }
};
function CardSection() {
    const [error, seterror] = useState('');
    return (
        <div className="col-12" style={{ width: 500 }}>
            <h2 className="paymentTitle">Card details</h2>
            <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e) => {
                    seterror(e.error.message);
                    setTimeout(() => {
                        seterror('');
                    }, 4000);
                }}
            />
            {error ? <p className="text-danger m-0">{error}</p> : null}
        </div>
    );
}
export default CardSection;
