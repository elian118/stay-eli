'use client';

import { Hotel, Room } from '@prisma/client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues, formSchema } from '@/components/room/constants';
import { Form } from '@/components/ui/form';
import { RoomImageUploadFormFieldView } from '@/components/room/(views)/RoomImageUploadFormFieldView';
import { useState } from 'react';
import IntroRoomFormFieldView from '@/components/room/(views)/IntroRoomFormFieldView';
import CountsFormFieldView from '@/components/room/(views)/CountsFormFieldView';

type AddRoomFormProps = {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogueOpen: () => void;
};

const AddRoomForm = ({ hotel, room, handleDialogueOpen }: AddRoomFormProps) => {
  const [image, setImage] = useState<string | undefined>(room?.image);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || defaultValues,
  });

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <IntroRoomFormFieldView form={form} />
          <RoomImageUploadFormFieldView form={form} imageState={[image, setImage]} />
          <div className="flex flex-row gap-6">
            <CountsFormFieldView form={form} />
            <div className="flex flex-1 flex-col gap-6">Part 2</div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
