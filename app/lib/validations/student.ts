import { z } from "zod";

export const StudentValidation = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
});
