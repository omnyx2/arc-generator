import { getRandomColor } from '@/components/baseObject/utils'
import { Bitmap, singleARCObjectOption } from '@/components/baseObject'
 
type triangleParams = {
    boxHeight: number;       // Height of the grid
    boxWidth: number;        // Width of the grid
    cx: number;              // x coordinate of triangle's top (center)
    cy: number;              // y coordinate of triangle's top (center)
    slope: number;          // Height of the triangle
    bitmap: Bitmap;      // 2D grid to store colors
    options: singleARCObjectOption;       // Available colors for the triangle
  };
  

  // Function to draw an upward-pointing triangle on a 2D grid
const drawTriangle = (params: triangleParams) => {
    for (let i = 0; i < params.boxHeight; i++) {
      for (let j = 0; j < params.boxWidth; j++) {
        // Calculate the boundaries of the triangle using a slope

        // Check if the point (i, j) is inside the triangle
        if (
          i >= params.cy &&                       // Below the triangle's top
          j >= params.cx - (i - params.cy) * params.slope && // Left boundary
          j <= params.cx + (i - params.cy) * params.slope    // Right boundary
        ) {
          params.bitmap[i][j] = getRandomColor(params.options); // Fill with a random color
        }
      }
    }
  };

export default drawTriangle