'use client'

import {useState, useCallback} from 'react'
import { generateBitmap, Bitmap } from '@/components/baseObject'
import { useOptions } from '@/app/OptionsContext';
 import { useSingleARCHistory } from '@/app/SingleARCHistoryContext';
import Gallery from '@/components/Gallery';
import BitmapRenderer from '@/components/Bitmap';
import SidePanel from '@/components/SidePanel'

const About: React.FC = () => {
    const [bitmapData, setBitmapData] = useState<Bitmap|undefined>([[0]])
    const { options } = useOptions();
    const {  addToHistory } = useSingleARCHistory();

    const bitmapGenerator = useCallback((): void => {
      const bitmap: Bitmap = generateBitmap(options);
      setBitmapData(bitmap)
      addToHistory({
        options: options,
        bitmap: bitmap,
        timestamp: new Date(),
      });
    },[options])

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
