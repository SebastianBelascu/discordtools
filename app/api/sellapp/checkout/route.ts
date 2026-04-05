import { NextRequest, NextResponse } from 'next/server';
import { getSellAppClient } from '@/lib/sellapp/client';
import { CreateInvoiceRequest } from '@/lib/sellapp/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateInvoiceRequest = await request.json();

    console.log('[checkout] Request body:', JSON.stringify(body, null, 2));

    if (!body.customer_email || !body.payment_method || !body.product_variants) {
      return NextResponse.json(
        { error: 'customer_email, payment_method, and product_variants are required' },
        { status: 400 }
      );
    }

    const client = getSellAppClient();

    // Make the raw fetch so we can log the full error body on failure
    const rawResponse = await fetch('https://sell.app/api/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SELLAPP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const rawBody = await rawResponse.json();
    console.log('[checkout] Sell.app raw response status:', rawResponse.status);
    console.log('[checkout] Sell.app raw response body:', JSON.stringify(rawBody, null, 2));

    if (!rawResponse.ok) {
      return NextResponse.json(
        {
          error: rawBody?.message || rawBody?.error || `Sell.app API Error: ${rawResponse.status}`,
          details: rawBody,
        },
        { status: rawResponse.status }
      );
    }

    const invoice = rawBody.data || rawBody;
    const checkoutUrl =
      invoice.checkout ||
      invoice.payment?.gateway?.data?.checkout_url ||
      invoice.payment?.gateway?.data?.payment_url;

    if (!invoice || !invoice.id) {
      console.error('[checkout] Invalid invoice response - missing ID:', rawBody);
      return NextResponse.json(
        { error: 'Failed to create invoice - invalid response from Sell.app', debug: rawBody },
        { status: 500 }
      );
    }

    if (!checkoutUrl) {
      console.error('[checkout] Missing checkout URL in response:', JSON.stringify(rawBody, null, 2));
      return NextResponse.json(
        { error: 'Failed to get checkout URL from Sell.app', debug: rawBody },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoice,
      checkout_url: checkoutUrl,
    });
  } catch (error) {
    console.error('[checkout] Unexpected error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout' },
      { status: 500 }
    );
  }
}
