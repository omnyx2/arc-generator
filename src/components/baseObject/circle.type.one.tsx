import { getRandomColor } from './utils'
import { bitmapObject, singleARCObjectOption} from "./types";
import { circleParams } from './types'

const drawCircle = (params: circleParams) => {
    for (let i = 0; i < params.boxHeight; i++) {
      for (let j = 0; j < params.boxWidth; j++) {
        // Check if the point is within the circle
        if ((i - params.cy) ** 2 + (j - params.cx) ** 2 < params.radius ** 2) {
            params.bitmap[i][j] = getRandomColor(params.options); // Fill with a random color
        }
      }
    }
};

export default drawCircle