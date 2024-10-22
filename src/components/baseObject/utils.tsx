import { bitmapObject, singleARCObjectOption } from "./types";
import { cmap, colorList } from '@/settings/cmap'

export const getRandomColor = (options: singleARCObjectOption): number => {
    //   return options.colorType[Math.floor(Math.random() * options.colorType.length)];
    return cmap.findIndex((elem: string) => options.colorType[0] === elem)
};

export function trimZeros(array: number[][]): number[][] {
  let top = 0, bottom = array.length - 1;
  let left = 0, right = array[0].length - 1;

  // Find the top boundary (first row with a non-zero element)
  while (top <= bottom && array[top].every(value => value === 0)) {
      top++;
  }

  // Find the bottom boundary (last row with a non-zero element)
  while (bottom >= top && array[bottom].every(value => value === 0)) {
      bottom--;
  }

  // Find the left boundary (first column with a non-zero element)
  while (left <= right && array.every(row => row[left] === 0)) {
      left++;
  }

  // Find the right boundary (last column with a non-zero element)
  while (right >= left && array.every(row => row[right] === 0)) {
      right--;
  }

  // Slice the array to the identified boundaries
  const trimmedArray = array.slice(top, bottom + 1).map(row => row.slice(left, right + 1));

  return trimmedArray;
}