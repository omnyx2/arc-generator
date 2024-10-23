'use client'

import {useState, useCallback} from 'react'
import { generateBitmap, Bitmap } from '@/components/baseObject'
import { useOptions } from '@/app/OptionsContext';
 import { useSingleARCHistory } from '@/app/SingleARCHistoryContext';
import Gallery from '@/components/Gallery';
import GalleryShape from '@/components/GalleryShape';
import BitmapRenderer from '@/components/Bitmap';
 
import TopologicalMap from '@/components/ToplogicalMap';
 
const About: React.FC = () => {
    const [bitmapData, setBitmapData] = useState<Bitmap|undefined>([[0]])
    const { options } = useOptions();
    const { addToHistory } = useSingleARCHistory();

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
        <div className='flex w-full'>
        <TopologicalMap/>
 
        <div className="w-full">
          <BitmapRenderer data={bitmapData} />
          <div className="w-full flex">
              <div className="w-[50%]">
                <GalleryShape/>
              </div>
              <div className="w-[50%]">
                <Gallery />
              </div>
            </div>
          </div>    
        </div> 
      </div>
    );
};
  
export default About;
// Example usage:
