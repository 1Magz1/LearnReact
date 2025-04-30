import { z } from 'zod';

export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  KZT = 'KZT',
}

export const userProfileSchema = z.object({
  avatar: z.string(),
  username: z.string().nonempty(),
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  age: z.coerce.number().min(18).max(120),
  currency: z.nativeEnum(Currency),
});

export interface UserProfile {
  firstname: string,
  lastname: string,
  age: number,
  currency: Currency,
  country: string,
  city: string,
  username: string,
  avatar: string,
}

export interface UserProfileSchema {
  data: UserProfile | null
}
