import { GraphQLClient } from 'graphql-request';

export const GRAPHQL_CLIENT = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL);
