import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import jwtDecode from 'jwt-decode';
import { AuthStore, TokenData, TokenDataSchema } from './type';

export const decodeAccessToken = (accessToken: string) =>
  TokenDataSchema.parse(jwtDecode<TokenData>(accessToken));

export const authStore = createStore<AuthStore>()(
  devtools(
    persist<AuthStore>(
      (set, get) => ({
        accessToken: undefined,
        accessTokenData: undefined,
        refreshToken: undefined,
        rememberMe: false,
        setAccessToken: (accessToken: string | undefined) => {
          const accessTokenData = (() => {
            try {
              return accessToken ? decodeAccessToken(accessToken) : undefined;
            } catch (error) {
              console.error(error);
              return undefined;
            }
          })();
          set({
            accessToken,
            accessTokenData,
          });
        },
        setRefreshToken: (refreshToken: string | undefined) =>
          set({
            refreshToken,
          }),
        setRememberMe: (rememberMe: boolean) =>
          set({
            rememberMe,
          }),
        clearTokens: () =>
          set({
            accessToken: undefined,
            accessTokenData: undefined,
            refreshToken: undefined,
            rememberMe: false,
          }),
      }),
      {
        name: 'auth',
      }
    ),
    {
      name: 'auth-store',
      enabled: !import.meta.env.VITE_NODE_ENV,
    }
  )
);

/**
 * Required for zustand stores, as the lib doesn't expose this type
 */
export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const accessTokenDataSelector = (state: ExtractState<typeof authStore>) => state.accessTokenData;
const refreshTokenSelector = (state: ExtractState<typeof authStore>) => state.refreshToken;
const rememberMeSelector = (state: ExtractState<typeof authStore>) => state.rememberMe;
const actionsSelector = (state: ExtractState<typeof authStore>) => state;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () => accessTokenDataSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getRememberMe = () => rememberMeSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
export const useRememberMe = () => useAuthStore(rememberMeSelector);
export const useActions = () => useAuthStore(actionsSelector);
