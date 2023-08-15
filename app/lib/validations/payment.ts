import { z } from "zod";

export const PaymentValidation = z.object({
  month: z.string().nonempty(),
  year: z.number(),
  isPaid: z.string(),
});
