const rewire = require('rewire');
const arrayGenerator = rewire('./array.generator');

describe('array generator', () => {
  const shuffle = (x: number[]): number[] => x;

  beforeEach(() => {
    arrayGenerator.__set__('shuffle', shuffle);
  });

  test('must generate an array', () => {
    const result = arrayGenerator.generateArray(3);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
