import * as controllers from './controllers';
import * as helper from './helper';

describe('search and analyse', () => {
  beforeEach(() => {
    helper.clearDictionary();
  });
  it('search should return the correct status', () => {
    const response = controllers.search('the boy');
    expect(response.status).toEqual('ok');
  });

  it('analyse should return the correct count for all the phrases', () => {
    controllers.search('The quick brown fox jumps over the lazy dog');
    controllers.search('The quick lion had mercy on the deer');
    controllers.search('The quick zebra outran the cheetah');

    const result = controllers.analyze('the quick,the');
    expect(result.results['the quick']).toEqual(3);
    expect(result.results.the).toEqual(6);
  });
});