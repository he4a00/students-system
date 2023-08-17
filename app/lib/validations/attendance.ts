import { z } from "zod";

export const AttendancValidation = z.object({
  present: z.string(),
});
