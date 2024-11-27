import { z } from 'zod';

const mongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
const roles = z
  .enum(['SUPER_ADMINISTRATOR', 'ADMINISTRATOR', 'COORDINATOR', 'ORGANIZATION', 'STUDENT'])
  .array();

type Role = z.infer<typeof roles>;

export const TokenDataSchema = z.object({
  _id: mongoIdSchema,
  roles,
  iat: z.number(),
  exp: z.number(),
});

export type TokenData = z.infer<typeof TokenDataSchema>;

export type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: TokenData | undefined;
  refreshToken: string | undefined;
  rememberMe: boolean;
  setAccessToken: (accessToken: string | undefined) => void;
  setRefreshToken: (refreshToken: string | undefined) => void;
  setRememberMe: (rememberMe: boolean) => void;
  clearTokens: () => void;
};
