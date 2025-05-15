import { z } from 'zod';

export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  KZT = 'KZT',
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
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

export interface UserShema {
  id: string,
  username: string,
  role: Role,
  avatar: string,
}

export interface UserProfile extends UserShema{
  firstname: string,
  lastname: string,
  age: number,
  currency: Currency,
  country: string,
  city: string,
}

export interface UserProfileSchema {
  data: UserProfile | null
}
