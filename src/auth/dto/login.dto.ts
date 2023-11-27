import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })
  .required();

export type loginDto = z.infer<typeof loginSchema>;
