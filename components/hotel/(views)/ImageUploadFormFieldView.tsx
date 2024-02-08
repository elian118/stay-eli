import React, { Dispatch, SetStateAction } from 'react';
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

export type ImageUploadFormFieldViewProps = {
  form: any;
  imageState: [string | undefined, Dispatch<SetStateAction<string | undefined>>];
  imageIsDeleting: boolean;
  handleImageDelete: (image: string) => void;
};

export const ImageUploadFormFieldView = ({
  form,
  imageState,
  imageIsDeleting,
  handleImageDelete,
}: ImageUploadFormFieldViewProps) => {
  const [image, setImage] = imageState;
  const { toast } = useToast();

  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem className="flex flex-col space-y-3">
          <FormLabel>Upload an Image *</FormLabel>
          <FormDescription>
            Choose an image that will show-case your hotel nicely
          </FormDescription>
          <FormControl>
            {image ? (
              <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                <Image className="object-contain" fill src={image} alt="Hotel Image" />
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
