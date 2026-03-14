import { NextRequest, NextResponse } from 'next/server';
import { getSellAppClient } from '@/lib/sellapp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);

    const client = getSellAppClient();
    const invoices = await client.listInvoices(page);

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
