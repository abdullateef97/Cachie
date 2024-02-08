import * as helper from './helper';

describe('search and analyse', () => {
  beforeEach(() => {
    helper.clearDictionary();
  });

  it('search should add the correct number of phrases to the dictionary', () => {
    const sentence = 'the boy is the';
    helper.search(sentence);
    const dictionary = helper.getDictionary();
    const phrases = Object.keys(dictionary);
    expect(phrases.length).toEqual(9);
  });

  it('analyse should return the correct count', () => {
    helper.search('The quick brown fox jumps over the lazy dog');
    helper.search('The quick lion had mercy on the deer');
    helper.search('The quick zebra outran the cheetah');

    const result = helper.analyze('the quick');
    expect(result).toEqual(3);
  });
});