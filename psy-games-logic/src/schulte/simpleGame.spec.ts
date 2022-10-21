import { SimpleGame } from './simpleGame';
const rewire = require('rewire');
const arrayGenerator = rewire('./array.generator');

describe('class SimpleGame', () => {
  const generateArray = (x: number): number[] => [0, 1, 2, 3, 4, 5, 6, 7, 8];

  beforeEach(() => {
    arrayGenerator.__set__('generateArray', generateArray);
  });

  test('should call generateArray', () => {
    const simpleGame = new SimpleGame(42);
  });
});
