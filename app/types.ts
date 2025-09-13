import * as z from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  featuredImg: z.string(),
  published: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  authorId: z.number(),
  author: z.object({ username: z.string() }),
});

export const postsResSechema = z.object({
  posts: z.array(postSchema),
  page: z.number(),
  pageSize: z.number(),
  totalPosts: z.number(),
});

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

export type Post = z.infer<typeof postSchema>;
export type PostsRes = z.infer<typeof postsResSechema>;
