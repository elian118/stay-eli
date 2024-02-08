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

export const checkList = [
  {
    key: 'gym',
    label: 'Gym',
  },
  {
    key: 'spa',
    label: 'Spa',
  },
  {
    key: 'bar',
    label: 'Bar',
  },
  {
    key: 'laundry',
    label: 'Laundry Facilities',
  },
  {
    key: 'restaurant',
    label: 'Restaurant',
  },
  {
    key: 'shopping',
    label: 'Shopping',
  },
  {
    key: 'freeParking',
    label: 'Free Parking',
  },
  {
    key: 'bikeRental',
    label: 'Bike Rental',
  },
  {
    key: 'freeWifi',
    label: 'Free Wifi',
  },
  {
    key: 'movieNights',
    label: 'Movie Nights',
  },
  {
    key: 'swimmingPool',
    label: 'Swimming Pool',
  },
  {
    key: 'coffeeShop',
    label: 'Coffee Shop',
  },
];
