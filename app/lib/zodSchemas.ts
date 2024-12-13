import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["published", "archived"]),
  price: z.number().refine((value) => value >= 1, {
    message: "Price must be a number greater than or equal to 1",
  }),

  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string(),
  isFeatured: z.boolean().optional(),
  newPrice: z
    .number()
    .refine((value) => value >= 1, {
      message: "Price must be a number greater than or equal to 1",
    })
    .optional(),
  quantity: z.number().min(0),
});

export const deliverySchema = z.object({
  name: z.string(),
  email: z.string(),
  City: z.string(),
  Country: z.string(),
  phone: z.string(),
  streetAddress: z.string(),

  postalCode: z.string().optional(),
  addressComplement: z.string().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});
