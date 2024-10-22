import rotate from './rotateClockwise';
import reverseRotate from './rotateCounterclockwise';

export interface Angular<T> {
    rotate90Clockwise(): T[][];
}
  

export const angularGroup = {
    rotate,
    reverseRotate
}
