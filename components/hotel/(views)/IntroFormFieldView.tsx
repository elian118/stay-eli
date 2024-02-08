import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { checkList } from '@/components/hotel/constants';
import { Checkbox } from '@/components/ui/checkbox';

type IntroFormFieldViewProps = {
  form: any;
};
const IntroFormFieldView = ({ form }: IntroFormFieldViewProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hotel Title *</FormLabel>
            <FormDescription>Provide your hotel name</FormDescription>
            <FormControl>
              <Input placeholder="Beach Hotel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hotel Description *</FormLabel>
            <FormDescription>
              Provide a detailed description of your hotel
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Beach Hotel is parked with many awesome amenitie!"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="pb-2">
        <FormLabel>Choose Amenities</FormLabel>
        <FormDescription>Choose Amenities popular in your hotel</FormDescription>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {checkList.map((e) => (
            <FormField
              key={e.key}
              control={form.control}
              name={e.key as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-end space-x-3 rounded-md">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{e.label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default IntroFormFieldView;
