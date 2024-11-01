import React, { createContext, useState,useEffect, useRef } from 'react';


export const ColorContext = createContext();

const ColorEditor = ({children, getHsl}) => {

    const [hslColor, setHslColor] = useState({h: 0, s: 0, l: 0});
    const [hue, setHue] = useState(0);

    useEffect(()=>{
        if(getHsl == null || getHsl == undefined){
        
        }else{
            getHsl(hslColor)
        }
      
    },[hslColor])

    return (
      <ColorContext.Provider value={{ 
        hue,
        setHue,
        hslColor,
        setHslColor
      }}>
        {children}
      </ColorContext.Provider>
    );
};

export default ColorEditor;