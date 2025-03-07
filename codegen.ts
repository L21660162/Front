import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://ssb.matehuala.tecnm.mx/asis_be/graphql',
  documents: './src/graphql/**/!(*.generated).{graphql,gql,ts}',
  require: ['ts-node/register'],
  ignoreNoDocuments: true,
  hooks: {
    afterOneFileWrite: [
      'sed -i -e"s|graphql-request/dist/types.dom|graphql-request/src/types.dom|g"',
    ],
  },
  generates: {
    './src/graphql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: 'graphql-request',
      },
    },
  },
  config: {
    interfacePrefix: 'I',
    typesPrefix: 'I',
    skipTypename: true,
    declarationKind: 'interface',
    noNamespaces: true,
    pureMagicComment: true,
    exposeQueryKeys: true,
    exposeFetcher: true,
    withHooks: true,
    fetcher: 'graphql-request',
  },
};

export default config;
