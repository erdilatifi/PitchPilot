import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: process.env.PRODUCT_ID, quantity: 1 }], // replace with your real Stripe price ID
      success_url: 'http://localhost:3000/payment-success',
      cancel_url: 'http://localhost:3000/',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Could not create checkout session' }, { status: 500 });
  }
}
