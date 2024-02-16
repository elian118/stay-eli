'use client';

import { Button } from '@/components/ui/button';
import { Loader2, PencilLine } from 'lucide-react';
import * as z from 'zod';
import { formSchema } from '@/components/room/constants';
import { UseFormReturn } from 'react-hook-form';

type SubmitBtnViewProps = {
  room: any;
  isLoading: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
};
const SubmitBtnView = ({ room, isLoading, form, onSubmit }: SubmitBtnViewProps) => {
  return (
    <div className="pt-4 pb-2">
      {room ? (
        <Button
          className="max-w-[150px]"
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading}
        >
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
        <Button
          className="max-w-[150px]"
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4" /> Creating
            </>
          ) : (
            <>
              <PencilLine className="mr-2 h-4 w-4" /> Create Room
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default SubmitBtnView;
