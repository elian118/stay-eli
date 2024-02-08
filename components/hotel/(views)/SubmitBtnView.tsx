'use client';

import { Button } from '@/components/ui/button';
import { Eye, Loader2, PencilLine, Trash } from 'lucide-react';
import { HotelWithRooms } from '@/components/hotel/AddHotelForm';
import { useRouter } from 'next/navigation';

type SubmitBtnViewProps = {
  hotel: HotelWithRooms | null;
  isLoading: boolean;
  isHotelDeleting: boolean;
  handleDeleteHotel: (val: HotelWithRooms) => void;
};
const SubmitBtnView = ({
  hotel,
  isLoading,
  isHotelDeleting,
  handleDeleteHotel,
}: SubmitBtnViewProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-between gap-2 flex-wrap">
      {hotel && (
        <Button
          className="max-w-[150px]"
          disabled={isHotelDeleting}
          variant="ghost"
          type="button"
          onClick={() => handleDeleteHotel(hotel)}
        >
          {isHotelDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4" /> Deleting
            </>
          ) : (
            <>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </>
          )}
        </Button>
      )}
      {hotel && (
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/hotel-details/${hotel.id}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      )}
      {hotel ? (
        <Button className="max-w-[150px]" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4" /> Updating
            </>
          ) : (
            <>
              <PencilLine className="mr-2 h-4 w-4" /> Update
            </>
          )}
        </Button>
      ) : (
        <Button className="max-w-[150px]" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4" /> Creating
            </>
          ) : (
            <>
              <PencilLine className="mr-2 h-4 w-4" /> Create Hotel
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default SubmitBtnView;
