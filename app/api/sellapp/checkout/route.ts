import { NextRequest, NextResponse } from 'next/server';
import { getSellAppClient } from '@/lib/sellapp/client';
import { CreateInvoiceRequest } from '@/lib/sellapp/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateInvoiceRequest = await request.json();

    if (!body.customer_email || !body.payment_method || !body.product_variants) {
      return NextResponse.json(
        { error: 'customer_email, payment_method, and product_variants are required' },
        { status: 400 }
      );
    }

    const client = getSellAppClient();
    
    const invoiceResponse: any = await client.createInvoice(body);
    
    const invoice = invoiceResponse.data || invoiceResponse;
    const checkoutUrl =
      invoice.checkout ||
      invoice.payment?.gateway?.data?.checkout_url ||
      invoice.payment?.gateway?.data?.payment_url;
    
    if (!invoice || !invoice.id) {
      console.error('Invalid invoice response - missing ID:', invoiceResponse);
      return NextResponse.json(
        { error: 'Failed to create invoice - invalid response from Sell.app' },
        { status: 500 }
      );
    }
    
    if (!checkoutUrl) {
      console.error('Missing checkout URL in response:', JSON.stringify(invoiceResponse, null, 2));
      return NextResponse.json(
        { error: 'Failed to get checkout URL from Sell.app', debug: invoiceResponse },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoice,
      checkout_url: checkoutUrl,
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout' },
      { status: 500 }
    );
  }
}
