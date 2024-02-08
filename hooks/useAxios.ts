import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const useAxios = () => {
  const errMsg: any = {
    variant: 'destructive',
    description: 'Something went wrong!',
  };

  const delImage = (
    imageKey: string,
    setImage?: (val: string | undefined) => void,
    setImageIsDeleting?: (val: boolean) => void,
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
        toast(errMsg);
      })
      .finally(() => {
        setImageIsDeleting && setImageIsDeleting(false);
      });
  };

  const postHandler = async (url: string, data: any, description?: string) => {
    try {
      const res = await axios.post(url, data);
      if (res) {
        toast({
          variant: 'success',
          description: description ?? '',
        });
      }
      return res;
    } catch (err) {
      console.error(err);
      toast(errMsg);
    }
  };

  const patchHandler = async (url: string, data: any, description?: string) => {
    try {
      const res = await axios.patch(url, data);
      if (res) {
        toast({
          variant: 'success',
          description: description ?? '',
        });
      }
      return res;
    } catch (err) {
      console.error(err);
      toast(errMsg);
    }
  };

  const delHandler = async (url: string, description?: string) => {
    try {
      const res = await axios.delete(url);
      if (res) {
        toast({
          variant: 'success',
          description: description ?? '',
        });
      }
      return res;
    } catch (err: any) {
      console.error(err);
      toast({
        variant: 'destructive',
        description: `Deletion could not be completed. ${err.message}`,
      });
    }
  };
  return { delImage, postHandler, patchHandler, delHandler };
};

export default useAxios;
