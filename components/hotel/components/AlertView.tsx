import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { HotelWithRooms } from '@/components/hotel/AddHotelForm';

type AlertViewProps = {
  hotel: HotelWithRooms | null;
};

const AlertView = ({ hotel }: AlertViewProps) => {
  return (
    <>
      {hotel && !hotel.rooms.length && (
        <Alert className="bg-indigo-600 text-white">
          <Terminal className="h-4 w-4 stroke-white" />
          <AlertTitle>One last step!</AlertTitle>
          <AlertDescription>
            Your hotel was created successfully 🔥
            <div>Please add some rooms to complete your hotel setup!</div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AlertView;
