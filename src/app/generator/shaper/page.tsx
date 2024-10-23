'use client'

import { Bitmap } from '@/components/baseObject'
import DrawGrid from '@/components/DrawGrid.js'
import { useShapeARCHistory } from '@/app/ARCShapeHistoryContext';
import Gallery from '@/components/GalleryShape';

const About: React.FC = () => {
    const { addToHistory } = useShapeARCHistory();
    const ARCShapeGenerator = (shape: Bitmap, shapeName: string) => {
      addToHistory({
        // name: "hi",
        bitmap: shape.map(e => [...e]),
        timestamp: new Date(),
        shapeName
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
