import { z } from 'zod';

export const CreateUserDtoSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    password: z.string().nonempty(),
    birthday: z.string().datetime(),
  })
  .required();

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
