import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const hotel = await prismadb.hotel.create({
      data: { ...body, userId },
    });

    return NextResponse.json(hotel);
  } catch (err) {
    console.error('Error at /api/hotel POST', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
