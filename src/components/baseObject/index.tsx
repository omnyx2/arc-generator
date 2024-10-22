import { Bitmap, singleARCObjectOption,} from "./types";
import { cmap, colorList } from '@/settings/cmap'
import { getRandomColor } from "./utils";
import drawCircle  from './circle.type.one'
import { circleParams } from './types'
import { Radius } from "lucide-react";
import drawTriangle from './triangle.type.one'
// Function to generate a 2D bitmap based on the provided options
export function generateBitmap(options: singleARCObjectOption): Bitmap {
    const [width, height] = options.size;
    const bitmap: Bitmap = Array.from({ length: height }, () => Array(width).fill(0));
  
    const drawRectangle = (x: number, y: number, w: number, h: number) => {
      for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
          if (i < height && j < width) {
            bitmap[i][j] = getRandomColor(options); // Fill with a random color
          }
        }
      }
    };
    const drawNoise = () => {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          // Randomly decide to fill the pixel or not
          bitmap[i][j] = Math.random() >= 0.5 ? getRandomColor(options) : 0; // Fill with color or leave empty
        }
      }
    };
  
    const drawRandomShape = () => {
      const shapeType = options.shape;
      const x = 0
      const y = 0
      const size = options.size
      console.log("hi", shapeType, options.colorType)
  
      switch (shapeType) {
        case 'rect':
          drawRectangle(x, y, size[0], size[1]); // Draw a square
          break;
        case 'circle':
            drawCircle({ 
                cx:  Math.floor(size[0]/2),
                cy:  Math.floor(size[1]/2),
                radius:  Math.floor(size[1]/2),
                boxHeight: Math.floor(size[1]),
                boxWidth: Math.floor(size[0]),
                bitmap: bitmap,
                options: options
            }); // Draw a circle
          break;
        case 'noise':
          drawNoise(); // Generate noise
          break;
        case 'random':
          Math.random() > 0.5 ? drawRectangle(x, y, size[0], size[1]) : drawCircle(x, y, size[0]); // Draw random shape
          break;
        case 'tri':
          drawTriangle({
            cx:  Math.floor(size[0]/2),
            cy:  0,
            slope: 0.5,
            boxHeight: Math.floor(size[1]),
            boxWidth: Math.floor(size[0]),
            bitmap: bitmap,
            options: options
          })
        default:
          console.warn(`Unknown shape type: ${shapeType}`);
      }
    };
  
    // Draw shapes based on the options
    const numberOfShapes = Math.floor(Math.random() * 10) + 1; // Random number of shapes
    for (let i = 0; i < numberOfShapes; i++) {
      drawRandomShape();
    }
  
    return bitmap;
}

export type { bitmapObject, Bitmap, singleARCObjectOption, metaInfoSingleARC, mixtureARCObject } from './types'
