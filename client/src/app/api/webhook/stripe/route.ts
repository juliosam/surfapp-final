import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let data: Stripe.Event.Data;
  let eventType: string;
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const sessionId = (data.object as Stripe.Checkout.Session).id;
        if (!sessionId) {
          throw new Error('No session ID found');
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items" ],
        });

        const customerId = typeof session.customer === 'string' ? session.customer : null;
        if (!customerId) {
          throw new Error('No customer ID found');
        }
        const customer = await stripe.customers.retrieve(customerId);
        
        if ('deleted' in customer) {
          throw new Error('Customer has been deleted');
        }
        
        const priceId = session?.line_items?.data[0]?.price?.id;

        console.log(customer.email);

        if(customer.email){
          const backendUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
          const adminToken = process.env.STRAPI_ADMIN_TOKEN;
          console.log('Admin token available:', !!adminToken);
          
          const response = await fetch(`${backendUrl}/api/users?filters[email]=${customer.email}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          });
          console.log('Response status:', response.status);
          const userData = await response.json();
          // console.log('Full API response:', userData);
          const user = userData?.[0];
          console.log('Found user:', user);

          if (user) {
            const updateResponse = await fetch(`${backendUrl}/api/users/${user.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                role: 3  // Replace 3 with your actual Auth-plus role ID
              }),
            });
            
            const updateResult = await updateResponse.json();
            console.log('Update result:', updateResult);
          }
        }
      }
        break;
    
      default:
        break;
    }
    
  } catch (e: any) {
    console.error('stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType);
  }

  return NextResponse.json({ received: true });
}
