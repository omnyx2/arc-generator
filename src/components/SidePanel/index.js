'use client'
import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cmap } from '@/settings/cmap'
import { OptionsContext, useOptions} from '@/app/OptionsContext';
import {SingleARCHistoryContextType} from '@/app/SingleARCHistoryContext'
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = [...cmap]

  const SidePanel = ({bitmapGenerator}) => {
  const [ isOpen, setIsOpen ] = useState(true);
  const { options, setOptions } = useContext(OptionsContext);
  const [isRandomSize, setIsRandomSize] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
        console.log(name, value)

    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: value
    }));
  };

  const handleSizeChange = (index, value) => {
    if (!isRandomSize) {
      setOptions(prevOptions => ({
        ...prevOptions,
        size: prevOptions.size.map((s, i) => i === index ? parseInt(value) : s)
      }));
    }
  };

  const handleColorChange = (color) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      colorType: color
    }));
  };

  const toggleRandomSize = () => {
    setIsRandomSize(!isRandomSize);
    if (!isRandomSize) {
      setOptions(prevOptions => ({
        ...prevOptions,
        size: [getRandomNumber(1,50), getRandomNumber(1,50)]
      }));
    } else {
      setOptions(prevOptions => ({
        ...prevOptions,
        size: [10, 10]
      }));
    }
  };

  return (
    <div className={`fixed top-16 right-0 h-full bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-12'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 -left-4 bg-white p-2 rounded-full shadow-md"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      
      {isOpen && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Options</h2>
          
          <div className="mb-4">
            <label className="block mb-2">Arc ID:</label>
            <input
              type="text"
              name="arcId"
              value={options.arcId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Color:</label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange([color])}
                  className={`w-full h-8 rounded ${
                    options.colorType[0] === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={isRandomSize}
                onChange={toggleRandomSize}
                className="mr-2"
              />
              Random Size
            </label>
            {!isRandomSize && (
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={options.size[0]}
                  onChange={(e) => handleSizeChange(0, e.target.value)}
                  className="w-1/2 p-2 border rounded"
                  disabled={isRandomSize}
                />
                <input
                  type="number"
                  value={options.size[1]}
                  onChange={(e) => handleSizeChange(1, e.target.value)}
                  className="w-1/2 p-2 border rounded"
                  disabled={isRandomSize}
                />
              </div>
            )}
            {isRandomSize && (
              <div className="text-gray-600 italic">Size will be set randomly [w,h], [{options.size[0]},{options.size[1]}]</div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Shape:</label>
            <select
              name="shape"
              value={options.shape}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {['rect', 'circle', 'noise', 'random', 'tri'].map(shape => (
                <option key={shape} value={shape}>{shape}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={bitmapGenerator(options)}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Generate
          </button>
          <button
            onClick={bitmapGenerator(options)}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Auto Generation
          </button>
          
          <pre className="mt-4 bg-gray-100 p-2 rounded">
            {JSON.stringify(options, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SidePanel;

