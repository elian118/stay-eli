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
import { formSchema, roomOptions } from '@/components/room/constants';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

type CountsFormFieldViewProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};
const CountsFormFieldView = ({ form }: CountsFormFieldViewProps) => {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-1 flex-col gap-6">
        {roomOptions
          .filter((e) => e.required)
          .map((opt, idx) => (
            <FormField
              key={`${opt.key}-${idx}`}
              control={form.control}
              name={opt.key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {opt.label} {opt.required ? '*' : ''}
                  </FormLabel>
                  <FormDescription>{opt.description}</FormDescription>
                  <FormControl>
                    <Input type="number" min={0} max={opt.max} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
      </div>
      <div className="flex flex-1 flex-col gap-6">
        {roomOptions
          .filter((e) => !e.required)
          .map((opt, idx) => (
            <FormField
              key={`${opt.key}-${idx}`}
              control={form.control}
              name={opt.key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {opt.label} {opt.required ? '*' : ''}
                  </FormLabel>
                  <FormDescription>{opt.description}</FormDescription>
                  <FormControl>
                    <Input type="number" min={0} max={opt.max} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default CountsFormFieldView;
