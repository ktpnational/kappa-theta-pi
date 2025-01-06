import type { Client, ClientOptions } from '@elastic/elasticsearch';

const createElasticSearchClient = async (options: ClientOptions): Promise<Client> => {
  const { Client } = await import('@elastic/elasticsearch');

  return new Client(options);
};

const DEFAULTS: ClientOptions = {
  node: 'http://localhost:9200',
  // TODO: Add auth
  // auth: {
  //   username: 'elastic',
  //   password: 'changeme',
  // },
};

// use this
export const getElasticClient = (): Promise<Client> => {
  return createElasticSearchClient(getElasticOptions());
};

const getElasticOptions = (): ClientOptions => {
  // this branch is for dev
  return {
    node: DEFAULTS.node,
  };
};
