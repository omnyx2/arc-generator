// components/BitmapRenderer.tsx
import React from 'react';
import { cmap } from '@/settings/cmap'
import { Bitmap } from '@/components/baseObject'
// 각 셀의 크기
const CELL_SIZE = 20;

// 색상 매핑 함수 (값에 따라 다른 색상을 매핑)
const getColor = (value: number ): string => {
  const colors = cmap
  return colors[value % colors.length]; // 값에 따라 색상 선택
};

type BitmapRendererProps = {
  data: Bitmap;
};

export const BitmapRenderer: React.FC<BitmapRendererProps> = ({ data }) => {
  if (data === undefined) return;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data[0].length}, ${CELL_SIZE}px)`,
        gap: '1px', // 셀 간격
      }}
    >
      {data.flat().map((value, index) => (
        <div
          key={index}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: getColor(value),
            border: '1px solid #ccc', // 셀 테두리
          }}
        />
      ))}
    </div>
  );
};

export default BitmapRenderer;
