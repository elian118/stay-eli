import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function PATCH(req: Request, { params }: { params: { hotelId: string } }) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!params.hotelId) {
      return new NextResponse('Hotel Id is required', { status: 400 });
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const hotel = await prismadb.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: { ...body },
    });

    return NextResponse.json(hotel);
  } catch (err) {
    console.error('Error at /api/hotel/:hotelId PATCH', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { hotelId: string } }) {
  try {
    const { userId } = auth();

    if (!params.hotelId) {
      return new NextResponse('Hotel Id is required', { status: 400 });
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const hotel = await prismadb.hotel.delete({
      where: {
        id: params.hotelId,
      },
    });

    return NextResponse.json(hotel);
  } catch (err) {
    console.error('Error at /api/hotel/:hotelId DELETE', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
