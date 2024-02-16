'use client';

import { useEffect, useState } from 'react';
import * as z from 'zod';
import { Hotel, Room } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { defaultValues, formSchema } from '@/components/hotel/constants';
import { ImageUploadFormFieldView } from '@/components/hotel/components/ImageUploadFormFieldView';
import CountryFormFieldView from '@/components/hotel/components/CountryFormFieldView';
import SubmitBtnView from '@/components/hotel/components/SubmitBtnView';
import IntroFormFieldView from '@/components/hotel/components/IntroFormFieldView';
import useAxios from '@/hooks/useAxios';
import { useRouter } from 'next/navigation';
import AlertView from '@/components/hotel/components/AlertView';

type AddHotelFromProps = {
  hotel: HotelWithRooms | null;
};

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const AddHotelForm = ({ hotel }: AddHotelFromProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHotelDeleting, setIsHotelDeleting] = useState<boolean>(false);
  const router = useRouter();
  const { postHandler, patchHandler, delHandler } = useAxios();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: hotel || defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (hotel) {
      // update
      await patchHandler(`/api/hotel/${hotel.id}`, values, '🎉 Hotel updated!');
      setIsLoading(false);
    } else {
      const res = await postHandler('/api/hotel', values, '🎉 Hotel created!');
      res && router.push(`/hotel/${res.data.id}`);
      setIsLoading(false);
    }
  };

  const handleDeleteHotel = async (hotel: HotelWithRooms) => {
    let res1;
    let res2;

    setIsHotelDeleting(true);
    const getImageKey = (src: string) => src.substring(src.lastIndexOf('/') + 1);
    const imageKey = getImageKey(hotel.image);
    res1 = await postHandler('/api/uploadthing/delete', { imageKey });
    res2 = res1 ? await delHandler(`/api/hotel/${hotel.id}`, 'Hotel Delete!') : null;
    res2 && router.push('/hotel/new');

    setIsHotelDeleting(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-lg font-semibold">
          {hotel ? 'Update your hotel!' : 'Describe your hotel!'}
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <IntroFormFieldView form={form} />
            <ImageUploadFormFieldView form={form} imageState={[image, setImage]} />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-1 flex-col gap-6">
              <CountryFormFieldView form={form} isLoading={isLoading} />
              <AlertView hotel={hotel} />
              <SubmitBtnView
                hotel={hotel}
                isLoading={isLoading}
                isHotelDeleting={isHotelDeleting}
                handleDeleteHotel={handleDeleteHotel}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddHotelForm;
