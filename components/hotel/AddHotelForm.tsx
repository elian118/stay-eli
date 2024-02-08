'use client';

import * as z from 'zod';
import { Hotel, Room } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { checkList, formSchema } from '@/components/hotel/constants';

type AddHotelFromProps = {
  hotel: HotelWithRooms | null;
};

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const AddHotelForm = ({ hotel }: AddHotelFromProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      country: '',
      state: '',
      city: '',
      locationDescription: '',
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimmingPool: false,
      coffeeShop: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-lg font-semibold">
          {hotel ? 'Update your hotel!' : 'Describe your hotel!'}
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={(fields) => (
                <FormItem>
                  <FormLabel>Hotel Title</FormLabel>
                  <FormDescription>Provide your hotel name</FormDescription>
                  <FormControl>
                    <Input placeholder="Beach Hotel" {...fields} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={(fields) => (
                <FormItem>
                  <FormLabel>Hotel Description</FormLabel>
                  <FormDescription>
                    Provide a detailed description of your hotel
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Beach Hotel is parked with many awesome amenitie!"
                      {...fields}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Choose Amenities</FormLabel>
              <FormDescription>Choose Amenities popular in your hotel</FormDescription>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {checkList.map((e) => (
                  <FormField
                    control={form.control}
                    name={e.key as any}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer">{e.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">part2</div>
        </div>
      </form>
    </Form>
  );
};

export default AddHotelForm;
