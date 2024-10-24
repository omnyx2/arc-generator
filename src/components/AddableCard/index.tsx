'use client'
import React, { useState } from 'react';
import { Plus } from 'lucide-react'

interface HovercardProps {
    idx: string | number;
    nodeId: string;
    width: string | number;
    height: string | number;
    handleLeftClick?: any;
    handleRightClick?:   any;
    handleTopClick?:  any;
    handleBottomClick?:  any;
    handleCenterClick?:  any;
}

const HoverCard: React.FC<HovercardProps> = ({idx, nodeId, width, height, handleBottomClick, handleLeftClick, handleRightClick, handleTopClick, handleCenterClick}) => {
  const basicCardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <div
      key={idx}
      className={`card shadow-sm border border-indigo-600`}
      style={{width, height: `calc(${height}rem )`}}
    >
        <div style={{width: "100%", height: `calc(${height}rem - 1rem )`}} >
            <div className={'h-2 w-full bg-white opacity-0 hover:opacity-100 hover:bg-blue-600 hover:h-6 transition-all 0.5s ease '} style={basicCardStyle}  onClick={handleTopClick}>
                <Plus/>
            </div>
            <div className={'h-36 w-full flex'}>
                <div className={'h-full w-2 bg-white opacity-0 hover:opacity-100 hover:bg-blue-600 hover:w-10 transition-all 0.5s ease'} style={basicCardStyle}  onClick={handleLeftClick}>
                    <Plus/>
                </div>
                <div className={'h-auto w-full'} onClick={handleCenterClick}>
                    <div>
                        {nodeId}
                    </div>
                </div>
                <div className={'bg-white opacity-0 hover:opacity-100 hover:bg-blue-600 h-full transition-all 0.5s ease w-2  hover:w-10'} style={basicCardStyle}  onClick={handleRightClick}>
                    <Plus/>
                </div>
            </div>
            <div className={'h-2 w-full bg-white opacity-0 hover:opacity-100 hover:bg-blue-600 hover:h-6 transition-all 0.5s ease'} style={basicCardStyle}  onClick={handleBottomClick}>
                <Plus/>
            </div>
        </div>
    </div>
  );
};

export default HoverCard;
