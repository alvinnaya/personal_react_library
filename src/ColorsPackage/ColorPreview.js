import React,{useContext} from 'react';
import { ColorContext } from './ColorEditor';

const ColorPreview = () => {
    const {
        hue,
        setHue,
        hslColor,
        setHslColor
    } = useContext(ColorContext);
    return (
        <div className='w-full h-[3rem]' style={{backgroundColor:`hsla(${(hslColor.h/100)*359}, ${hslColor.s}%, ${hslColor.l}%, 1)`,}}>

    </div>
    );
};

export default ColorPreview;