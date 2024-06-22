import { z } from "zod";

export const signupSchema = z.object({
	body: z.object({
		name: z.string({ invalid_type_error: "Name is required" }),
		email: z
			.string({ invalid_type_error: "Email must be a string" })
			.email("Invalid email format"),
		password: z.string().min(6, "Password must be at least 6 characters long"),
        addresses: z.array(z.number()).optional(),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		email: z
			.string({ invalid_type_error: "Email must be a string" })
			.email("Invalid email format"),
		password: z.string(),
	}),
});

export const CreateAddressSchema = z.object({
	body: z.object({
		line_one: z.string({ required_error: "Line one is required" }),
		line_two: z.string({ required_error: "Line two is required" }).optional().nullable(),
		city: z.string({ required_error: "City is required" }),
		country: z.string({ required_error: "Country is required" }),
		pincode: z.string({ required_error: "Pincode is required" }),
		user_id: z.number({ required_error: "User id is required" }).optional(),
	}),
});

export const GetAddressSchema = z.object({});

export const DeleteAddressSchema = z.object({
	params: z.object({
		address_id: z.string(),
	}),
});
