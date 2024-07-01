import { z } from "zod";

export const StudentValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  phoneNumber: z.string().nonempty(),
  gender: z.string().nonempty(),
  eduyear: z.string().nonempty(),
});
