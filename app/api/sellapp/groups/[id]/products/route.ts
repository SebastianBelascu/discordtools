import { NextRequest, NextResponse } from 'next/server';
import { getSellAppClient } from '@/lib/sellapp/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const groupId = parseInt(id, 10);

    if (isNaN(groupId)) {
      return NextResponse.json({ error: 'Invalid group ID' }, { status: 400 });
    }

    const client = getSellAppClient();
    const products = await client.listGroupProducts(groupId);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching group products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch group products' },
      { status: 500 }
    );
  }
}
