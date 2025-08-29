import * as z from 'zod';

export type UserRole = 'ADMIN' | 'USER';

export type User = {
  id: number;
  username: string;
  role: UserRole;
};

export const userTokenPayloadSchema = z.object({
  sub: z.number(),
  username: z.string(),
  role: z.union([z.literal('ADMIN'), z.literal('USER')]),
  iat: z.number().transform((val) => new Date(val)),
  exp: z.number().transform((val) => new Date(val)),
});

export const successfulAuthResSchema = z.object({
  message: z.string(),
  data: z.object({ token: z.jwt() }),
});

export const signupErrorResponse = z.object({
  type: z.string(),
  error: z.string(),
  detail: z.object({
    password: z.object({ msg: z.string() }).optional(),
    username: z.object({ msg: z.string() }).optional(),
  }),
});

export const signupResSchema = z.union([
  successfulAuthResSchema,
  signupErrorResponse,
]);

export const loginResSchema = z.union([
  successfulAuthResSchema,
  z.object({ error: z.string(), status: z.number() }),
]);

export type UserTokenPayload = z.infer<typeof userTokenPayloadSchema>;
