import rotate from './rotateClockwise';
import reverseRotate from './rotateCounterclockwise';

interface Angular<T> {
    rotate90Clockwise(): T[][];
}
  

const angularGroup = {
    rotate,
    reverseRotate
}
