'use client';

import { Hotel, Room } from '@prisma/client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, formSchema } from '@/components/room/constants';
import { Form } from '@/components/ui/form';
import { RoomImageUploadFormFieldView } from '@/components/room/components/RoomImageUploadFormFieldView';
import { useEffect, useState } from 'react';
import IntroRoomFormFieldView from '@/components/room/components/IntroRoomFormFieldView';
import CountsFormFieldView from '@/components/room/components/CountsFormFieldView';
import SubmitBtnView from '@/components/room/components/SubmitBtnView';
import { useRouter } from 'next/navigation';
import useAxios from '@/hooks/useAxios';

type AddRoomFormProps = {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogueOpen: () => void;
};

const AddRoomForm = ({ hotel, room, handleDialogueOpen }: AddRoomFormProps) => {
  const [image, setImage] = useState<string | undefined>(room?.image);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { patchHandler, postHandler } = useAxios();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('submit add a room');
    setIsLoading(true);

    if (hotel && room) {
      // update
      const res = await patchHandler(`/api/room/${room.id}`, values, '🎉 Room updated!');
      res && router.refresh();
      setIsLoading(false);
      handleDialogueOpen();
    } else {
      if (!hotel) return;

      const res = await postHandler(
        '/api/room',
        { ...values, hotelId: hotel.id },
        '🎉 Hotel created!',
      );
      res && router.refresh();
      setIsLoading(false);
      handleDialogueOpen();
    }
  };

  useEffect(() => {
    if (typeof image === 'string') {
      form.setValue('image', image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: false,
      });
    }
  }, [image]);

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <IntroRoomFormFieldView form={form} />
          <RoomImageUploadFormFieldView form={form} imageState={[image, setImage]} />
          <CountsFormFieldView form={form} />
          <SubmitBtnView
            room={room}
            isLoading={isLoading}
            form={form}
            onSubmit={onSubmit}
          />
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
