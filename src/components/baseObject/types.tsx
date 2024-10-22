
export type Bitmap =  number[][];

export interface bitmapObject {
    bitmap: Bitmap;
    arcId: string;
    width: number;
    height: number;
  }
  
export interface singleARCObjectOption {
    arcId: string;
    colorType: string[]; //which color will use for
    size: number[]; // [w,h]
    shape: string; // rect, circle, noise, random
  }
  
export interface metaInfoSingleARC {
    arcId: string;
    top: number;
    left: number;

}

export interface mixtureARCObject {
    arcId: string;
    data: metaInfoSingleARC[];
}


export interface circleParams {
    cx: number;
    cy: number;
    radius: number;
    boxHeight: number;
    boxWidth: number;
    bitmap: Bitmap;
    options: singleARCObjectOption;
}
export interface shapeARC {
    bitmap: Bitmap;
    size: number[];

}