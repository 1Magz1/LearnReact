import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type AuthFormValues = z.infer<typeof authSchema>;
