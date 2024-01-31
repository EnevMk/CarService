import Stripe from 'stripe';
import { STRIPE_KEY, ZEROBOUNCE_KEY } from '..';

const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2023-10-16',
});

const testCard = {
    number: '4242424242424242',
    exp_month: 8,
    exp_year: 2026,
    cvc: '314',
};

export const validateTestCard = async () => {
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: testCard,
        });

        console.log('Payment method created successfully:', paymentMethod);
    } catch (error) {
        console.error('Error validating test card:', error);
    }
};

export const validateEmail = async (email: string) => {
    const apiURL = 'https://api.zerobounce.net/v2/validate';
    const queryString = `?api_key=${ZEROBOUNCE_KEY}&email=${email}&ip_address=`;
    const fullURL = apiURL + queryString;

    const response = await fetch(fullURL);

    if (!response.ok) {
        console.log(`Error validating email. Status: ${response.status}`)
        throw new Error(`Error validating email. Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status !== 'valid') {
        console.log(`Not Valid`)
        throw JSON.stringify(result);
    }
};


