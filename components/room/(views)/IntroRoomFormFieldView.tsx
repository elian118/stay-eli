'use client';

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
import { checkList } from '@/components/room/constants';
import { Checkbox } from '@/components/ui/checkbox';

type IntroRoomFormFieldViewProps = {
  form: any;
};
const IntroRoomFormFieldView = ({ form }: IntroRoomFormFieldViewProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Title *</FormLabel>
            <FormDescription>Provide a room name</FormDescription>
            <FormControl>
              <Input placeholder="Double Room" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Description *</FormLabel>
            <FormDescription>Is there anything special about this room?</FormDescription>
            <FormControl>
              <Textarea
                placeholder="Have a beautiful view of the ocean while in this room!"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <FormLabel>Choose Room Amenities</FormLabel>
        <FormDescription>What makes this room a good choice?</FormDescription>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {checkList.map((e) => (
            <FormField
              key={e.key}
              control={form.control}
              name="roomService"
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

export default IntroRoomFormFieldView;
