import React, { useState, useRef, useEffect } from 'react';
import { trimZeros } from '@/components/baseObject/utils';

const GridDrawing = ({handleOnSave}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [gridSize, setGridSize] = useState({ width: 20, height: 20 });
  const [shapeName, setShapeName] = useState("")
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [gridArray, setGridArray] = useState([]);
  const gridRef = useRef(null);
  const [drawMode, setDrawMode] = useState('draw'); // 'draw' or 'erase'
  const lastCellRef = useRef(null); // Prevent rapid toggling of the same cell

  // Convert selected cells to 2D array
  const updateGridArray = (selected) => {
    const array2D = Array.from({ length: gridSize.height }, (_, y) =>
      Array.from({ length: gridSize.width }, (_, x) => 
        selected.has(`${x},${y}`) ? 1 : 0
      )
    );
    setGridArray(array2D);
  };

  // Convert mouse position to grid coordinates
  const getGridCoordinates = (e) => {
    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 30);
    const y = Math.floor((e.clientY - rect.top) / 30);
    return { x, y };
  };

  // Toggle cell selection
  const toggleCell = (x, y) => {
    const cellKey = `${x},${y}`;
    setSelectedCells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cellKey)) {
        newSet.delete(cellKey);
      } else {
        newSet.add(cellKey);
      }
      return newSet;
    });
  };

  // Handle mouse events
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { x, y } = getGridCoordinates(e);
    const cellKey = `${x},${y}`;
    
    // Set draw mode based on current cell state
    setDrawMode(selectedCells.has(cellKey) ? 'erase' : 'draw');
    toggleCell(x, y);
    lastCellRef.current = cellKey;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    const { x, y } = getGridCoordinates(e);
    const cellKey = `${x},${y}`;
    
    // Prevent toggling the same cell repeatedly
    if (lastCellRef.current === cellKey) return;
    lastCellRef.current = cellKey;

    setSelectedCells(prev => {
      const newSet = new Set(prev);
      if (drawMode === 'draw') {
        newSet.add(cellKey);
      } else {
        newSet.delete(cellKey);
      }
      return newSet;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastCellRef.current = null;
    // Update grid array when drawing ends
    updateGridArray(selectedCells);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Reset grid
  const handleClear = () => {

    
    setSelectedCells(new Set());
    updateGridArray(new Set());
  };

  const handleSave = () => {
    const result = trimZeros(Array.from({ length: gridSize.height }, (_, y) =>
      Array.from({ length: gridSize.width }, (_, x) => (
        selectedCells.has(`${x},${y}`) ? 1 : 0
      ))
    ))
    
    handleOnSave(result, shapeName)
    setSelectedCells(new Set());
    setShapeName("")
    updateGridArray(new Set());

  };

  // Render a single cell
  const Cell = ({ x, y }) => {
    const isSelected = selectedCells.has(`${x},${y}`);
    
    return (
      <div 
        className={`
          w-[30px] h-[30px] 
          border border-gray-200
          relative
          transition-colors duration-150
          ${isSelected ? 'bg-gray-400' : 'bg-white'}
          hover:bg-gray-100
        `}
      >
        {!isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-full h-full relative"
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent 45%, red 45%, red 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, red 45%, red 55%, transparent 55%)'
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          save
        </button>
        <div className="flex gap-2 items-center">
          <label>Width:</label>
          <input
            type="number"
            value={gridSize.width}
            onChange={(e) => {
              const newSize = { ...gridSize, width: parseInt(e.target.value) || 1 };
              setGridSize(newSize);
              updateGridArray(selectedCells);
            }}
            className="w-16 px-2 py-1 border rounded"
            min="1"
            max="50"
          />
          <label>Height:</label>
          <input
            type="number"
            value={gridSize.height}
            onChange={(e) => {
              const newSize = { ...gridSize, height: parseInt(e.target.value) || 1 };
              setGridSize(newSize);
              updateGridArray(selectedCells);
            }}
            className="w-16 px-2 py-1 border rounded"
            min="1"
            max="50"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label>Shape Name:</label>
          <input
            type="strins"
            value={shapeName}
            onChange={(e) => {
              const _ = e.target.value;
              setShapeName(e.target.value);
            }}
            className="w-16 px-2 py-1 border rounded"
            min="1"
            max="50"
          />

        </div>
      </div>

      <div 
        ref={gridRef}
        className="border border-gray-300 select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div 
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize.width}, 30px)`,
            gridTemplateRows: `repeat(${gridSize.height}, 30px)`
          }}
        >
          {Array.from({ length: gridSize.height }, (_, y) =>
            Array.from({ length: gridSize.width }, (_, x) => (
              <Cell key={`${x},${y}`} x={x} y={y} />
            ))
          )}
        </div>
      </div>

      <div className="mt-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-2">Grid Array Output:</h3>
        <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[200px]">
          <pre className="text-sm">
            {JSON.stringify(gridArray, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Click and drag to draw. Click again to toggle cells. Selected cells will be gray, unselected cells will show a red X.
      </div>
    </div>
  );
};

export default GridDrawing;