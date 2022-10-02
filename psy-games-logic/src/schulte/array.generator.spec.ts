const rewire = require('rewire');
// const arrayGenerator = rewire('../../dist/schulte/array.generator.js');
const arrayGenerator = rewire('./array.generator');

describe('array generator', () => {
  // const shuffle = (x: number[]): number[] => [0, 5, 3, 6, 1, 7, 2, 4, 8];
  const shuffle = (x: number[]): number[] => x;

  beforeEach(() => {
    arrayGenerator.__set__('shuffle', shuffle);
  });

  test('must ok', () => {
    const result = arrayGenerator.generateArray(3);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
