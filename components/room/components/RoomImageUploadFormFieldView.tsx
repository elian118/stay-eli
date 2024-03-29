'use client';

import { useState } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, XCircle } from 'lucide-react';
import { UploadButton } from '@/components/uploadthing';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { formSchema } from '@/components/room/constants';

export type ImageUploadFormFieldViewProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  imageState: [string | undefined, (val: string | undefined) => void];
};

export const RoomImageUploadFormFieldView = ({
  form,
  imageState,
}: ImageUploadFormFieldViewProps) => {
  const [image, setImage] = imageState;
  const [imageIsDeleting, setImageIsDeleting] = useState(false);

  const { delImage } = useAxios();
  const { toast } = useToast();

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf('/') + 1);
    delImage(imageKey, setImage, setImageIsDeleting);
  };

  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem className="flex flex-col space-y-3">
          <FormLabel>Upload an Image *</FormLabel>
          <FormDescription>
            Choose an image that will show-case your room nicely
          </FormDescription>
          <FormControl>
            {image ? (
              <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                <Image className="object-contain" fill src={image} alt="Room Image" />
                <Button
                  className="absolute right-[-12px] top-0"
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleImageDelete(image)}
                >
                  {imageIsDeleting ? <Loader2 /> : <XCircle />}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-[4000px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log('Files: ', res);
                    setImage(res[0].url);
                    toast({
                      variant: 'success',
                      description: '🎉 Upload Completed!',
                    });
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      description: `Error! ${error.message}`,
                    });
                  }}
                />
              </div>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
