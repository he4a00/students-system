import { z } from "zod";

export const PaymentValidation = z.object({
  month: z.string().nonempty(),
  year: z.string(),
  isPaid: z.string(),
});
