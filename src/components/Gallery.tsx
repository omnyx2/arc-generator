'use client'

import React from 'react';
import { useSingleARCHistory } from '@/app/SingleARCHistoryContext';
import BitmapRenderer from './Bitmap';

//map to history


const Gallery: React.FC = () => {
  const { history } = useSingleARCHistory();

  return (
    <div>
      <h2>Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {history.map((entry, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <BitmapRenderer data={entry.bitmap} />
            <p>Generated at: {entry.timestamp.toLocaleString()}</p>
            <details>
              <summary>Options</summary>
              <pre>{JSON.stringify(entry.options, null, 2)}</pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;