import { z } from 'zod';

const userMongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
const periodMongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
const roles = z
  .enum([
    'SUPER_ADMINISTRATOR',
    'DIRECTOR_ACADEMICO',
    'SUBDIRECTOR_ACADEMICO',
    'RECURSOS_HUMANOS',
    'JEFE_ACADEMICO',
    'DOCENTE',
    'PREFECTO',
  ])
  .array();
const path = z.enum(['/asis/', '/ss/']);

export const TokenDataSchema = z.object({
  _id: userMongoIdSchema,
  roles,
  actualPeriod: periodMongoIdSchema,
  iat: z.number(),
  exp: z.number(),
  path
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
