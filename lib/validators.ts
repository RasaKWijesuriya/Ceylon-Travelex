import { z } from "zod";

export const idParam = z.string().min(1);

export const enquirySchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  destination_id: z.string().trim().optional(),
  travel_date: z.string().trim().optional(),  // "YYYY-MM-DD"
  party_size: z.coerce.number().int().min(1).max(20).optional(),
  message: z.string().trim().min(10),
  company: z.string().max(10).optional(),     // honeypot
});


export const bookingSchema = z.object({
  customer_id: z.string().trim(),
  destination_id: z.string().trim(),
  start_date: z.string().trim(),   // "YYYY-MM-DD"
  end_date: z.string().trim(),
  party_size: z.coerce.number().int().min(1),
  total_amount: z.coerce.number().nonnegative(),
});
