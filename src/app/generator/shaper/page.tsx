'use client'

import {useState, useContext} from 'react'
import { generateBitmap, singleARCObjectOption, Bitmap } from '@/components/baseObject'
import { OptionsContext } from '@/app/OptionsContext';
 import BitmapRenderer from '@/components/Bitmap';
import SidePanel from '@/components/SidePanel'
import DrawGrid from '@/components/DrawGrid.js'
import { useShapeARCHistory } from '@/app/ARCShapeHistoryContext';
import Gallery from '@/components/GalleryShape';

const About: React.FC = () => {
    const [bitmapData, useBitmapData] = useState()
    const { options }: any= useContext(OptionsContext);
    const { history, addToHistory } = useShapeARCHistory();


    const ARCShapeGenerator = (shape: Bitmap) => {
      addToHistory({
        // name: "hi",
        bitmap: shape.map(e => [...e]),
        timestamp: new Date(),
      });
    }

    return (
      <div className="container mx-auto p-8">
 
        <h1 className="text-4xl font-bold">About Us</h1>
        <div className="bg-gray">regenerate</div>
        <DrawGrid handleOnSave={ARCShapeGenerator}/>
        <Gallery />
      </div>
    );
};
  
export default About;
// Example usage:
