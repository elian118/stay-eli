import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must me at least 3 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must me at least 10 characters long',
  }),
  image: z.string().min(1, {
    message: 'Image is required',
  }),
  country: z.string().min(1, {
    message: 'Country is required',
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: 'Description must me at least 10 characters long',
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});

export const defaultValues = {
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
};

export const checkList = Object.keys(defaultValues)
  .slice(7)
  .map((e, idx) => {
    const toTitleCase = (str: string) =>
      `${str.slice(0, 1).toUpperCase()}${str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}`;

    return {
      key: e,
      label: `${toTitleCase(e)}${idx === 3 ? ' Facilities' : ''}`,
    };
  });
