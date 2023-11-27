import { z } from 'zod';

export const UpdateUserDtoSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    password: z.string().nonempty(),
    birthday: z.string().datetime(),
  })
  .required();

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
