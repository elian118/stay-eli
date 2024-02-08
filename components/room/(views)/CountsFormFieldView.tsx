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

type CountsFormFieldViewProps = {
  form: any;
};
const CountsFormFieldView = ({ form }: CountsFormFieldViewProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <FormField
        control={form.control}
        name="roomPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Price in USD *</FormLabel>
            <FormDescription>
              State the price for staying in this room for 24hours.
            </FormDescription>
            <FormControl>
              <Input type="number" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bedCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bed Count *</FormLabel>
            <FormDescription>How many beds are available in this room.</FormDescription>
            <FormControl>
              <Input type="number" min={0} max={8} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="guestCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Count *</FormLabel>
            <FormDescription>How many guests are allowed in this room.</FormDescription>
            <FormControl>
              <Input type="number" min={0} max={20} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bathroomCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bathroom Count *</FormLabel>
            <FormDescription>How many bathroom are in this room.</FormDescription>
            <FormControl>
              <Input type="number" min={0} max={8} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CountsFormFieldView;
