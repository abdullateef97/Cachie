import * as helpers from './helper';

export const search = (search_query: string) : { status: string } => {
  helpers.search(search_query);
  return { status: 'ok' };
};

export const analyze = (analysis_token: string): { results: { [key: string]: number } } => {
  const results: { [key: string]: number } = {};
  const splitToken = analysis_token.split(',');
  splitToken.forEach((phrase) => {
    results[phrase] = helpers.analyze(phrase);
  });
  return {
    results,
  };
};
