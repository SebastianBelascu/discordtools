import { NextResponse } from 'next/server';
import { getSellAppClient } from '@/lib/sellapp/client';

export async function GET() {
  try {
    const client = getSellAppClient();
    const groups = await client.listGroups();
    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}
