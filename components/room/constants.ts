import * as z from 'zod';

type Option = {
  key: any;
  label: string;
  description: string;
  max?: number;
  required?: boolean;
};

export const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  bedCount: z.coerce.number().min(1, { message: 'Bed count is required' }),
  guestCount: z.coerce.number().min(1, { message: 'Guest count is required' }),
  bathroomCount: z.coerce.number().min(1, { message: 'Bathroom count is required' }),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, { message: 'Image is required' }),
  breakfastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, { message: 'Room price is required' }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
});

export const defaultValues = {
  title: '',
  description: '',
  bedCount: 0,
  guestCount: 0,
  bathroomCount: 0,
  kingBed: 0,
  queenBed: 0,
  image: '',
  breakfastPrice: 0,
  roomPrice: 0,
  roomService: false,
  TV: false,
  balcony: false,
  freeWifi: false,
  cityView: false,
  oceanView: false,
  forestView: false,
  mountainView: false,
  airCondition: false,
  soundProofed: false,
};

export const checkList = Object.keys(defaultValues)
  .slice(10)
  .map((e, idx) => {
    const toTitleCase = (str: string) =>
      `${str.slice(0, 1).toUpperCase()}${str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}`;

    return {
      key: e,
      label: `${idx === 0 ? '24hours ' : ''}${toTitleCase(e)}`,
    };
  });

export const roomOptions: Option[] = [
  {
    key: 'roomPrice',
    label: 'Room Price in USD',
    description: 'State the price for staying in this room for 24hours.',
    required: true,
  },
  {
    key: 'bedCount',
    label: 'Bed Count',
    description: 'How many beds are available in this room.',
    max: 8,
    required: true,
  },
  {
    key: 'guestCount',
    label: 'Guest Count',
    description: 'How many guests are allowed in this room.',
    max: 20,
    required: true,
  },
  {
    key: 'bathroomCount',
    label: 'Bathroom Count',
    description: 'How many bathroom are in this room.',
    max: 8,
    required: true,
  },
  {
    key: 'breakfastPrice',
    label: 'Breakfast Price in USD',
    description: 'State the price for staying in this room for 24hours.',
  },
  {
    key: 'kingBed',
    label: 'King Beds',
    description: 'How many king beds are available in this room.',
    max: 8,
  },
  {
    key: 'queenBed',
    label: 'Queen Beds',
    description: 'How many queen beds ard in this room.',
    max: 8,
  },
];
