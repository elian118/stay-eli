import prismadb from '@/lib/prismadb';

export const getHotelById = async (hotelId: string) => {
  try {
    const hotel = await prismadb.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        rooms: true,
      },
    });
    // 호텔 정보가 없으면 null 반환
    if (!hotel) return null;

    return hotel;
  } catch (err: any) {
    throw new Error(err);
  }
};
