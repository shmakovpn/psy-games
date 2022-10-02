function shuffle(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function generateArray(size: number): number[] {
  const array = [...Array(size * size).keys()];
  shuffle(array);
  return array;
}

