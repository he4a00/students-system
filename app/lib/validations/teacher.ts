import { z } from "zod";

export const TeacherValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  subject: z.string().nonempty(),
  gender: z.string(),
});
