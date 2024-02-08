import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { Dispatch, SetStateAction } from 'react';

const useAxios = () => {
  const delImage = (
    imageKey: string,
    setImage?: Dispatch<SetStateAction<string | undefined>>,
    setImageIsDeleting?: Dispatch<SetStateAction<boolean>>,
  ) => {
    axios
      .post('/api/uploadthing/delete', { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage && setImage('');
          toast({
            variant: 'success',
            description: 'Image removed',
          });
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          description: 'Something went wrong',
        });
      })
      .finally(() => {
        setImageIsDeleting && setImageIsDeleting(false);
      });
  };

  return { delImage };
};

export default useAxios;
