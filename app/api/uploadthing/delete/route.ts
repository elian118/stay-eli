import { UTApi } from 'uploadthing/server';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const utapi = new UTApi();

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const { imageKey } = await req.json();

  try {
    const res = await utapi.deleteFiles(imageKey);
    return NextResponse.json(res);
  } catch (err) {
    console.error('error at uploadthing/delete:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
