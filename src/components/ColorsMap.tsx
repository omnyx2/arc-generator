import { cmap, colorList } from '@/settings/cmap';

interface Color {
    color: string;
    colorName: string;
}

function ColorGrid ({ color, colorName }: Color ) {
    return (
        <div className='text-center' >
            <div className="w-12 h-12 m-0 p-0" style={{backgroundColor:color}}/>
            <div className='text-xs'>
                {colorName}
            </div>
        </div>
    
    )
}

const ColorsMap  = () => {
    const colors = cmap.map((color,idx) => <ColorGrid color={color} key={idx} colorName={colorList[idx]}/>) 
    return (
        <div className='flex'>
            {colors}
        </div>
    )
}

export default ColorsMap;