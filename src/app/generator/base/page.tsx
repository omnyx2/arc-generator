'use client'

import {useState, useContext} from 'react'
import { generateBitmap, singleARCObjectOption, Bitmap } from '@/components/baseObject'
import { OptionsContext } from '@/app/OptionsContext';
import { useSingleARCHistory } from '@/app/SingleARCHistoryContext';
import Gallery from '@/components/Gallery';
import BitmapRenderer from '@/components/Bitmap';
import SidePanel from '@/components/SidePanel'


const About: React.FC = () => {
    const [bitmapData, useBitmapData] = useState()
    const { options }: any= useContext(OptionsContext);
    const { history, addToHistory } = useSingleARCHistory();


    const bitmapGenerator = () => {
      const bitmap: Bitmap = generateBitmap(options);
      useBitmapData(bitmap)

      addToHistory({
        options: options,
        bitmap: bitmap,
        timestamp: new Date(),
      });
    }

    return (
      <div className="container mx-auto p-8">

        <h1 className="text-4xl font-bold">About Us</h1>
        <div className="bg-gray">regenerate</div>
        <BitmapRenderer data={bitmapData} />
        <Gallery />

        <p>This is the about page of the Fancy Website.</p>
        <SidePanel bitmapGenerator={() => bitmapGenerator}/>
      </div>
    );
};
  
export default About;
// Example usage:
