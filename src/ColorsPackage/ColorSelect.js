import React, {useState,useContext,useEffect} from 'react';
import Drag from 'react-drag-anp';
import { ColorContext } from './ColorEditor';

const ColorSelect = ({getHsl, children}) => {

    const [ColorPosX, setColorPosX] = useState(0);
    const [ColorPosY, setColorPosY] = useState(0);

    const {
        hue,
        setHue,
        hslColor,
        setHslColor
    } = useContext(ColorContext);

    useEffect(()=>{
        const newHslColor = hsvToHsl(hue, ColorPosX, (100-ColorPosY));
        setHslColor(newHslColor);

        if(getHsl == null || getHsl == undefined){
        
        }else{
            getHsl(hslColor)
        }

        // if(getXpos == null || getXpos == undefined){
        
        // }else{
        //     getXpos(ColorPosX)
        // }
      
      
    },[ColorPosX,ColorPosY,hue])

    function hsvToHsl(h, s, v) {
        // Normalisasi nilai
        h = h / 360; // Hue dalam rentang 0-1
        s = s / 100; // Saturation dalam rentang 0-1
        v = v / 100; // Value dalam rentang 0-1
    
        // Hitung Lightness (L)
        const l = (2 - s) * v / 2;
    
        // Hitung Saturation (S)
        let sl;
        if (l === 0 || l === 1) {
            sl = 0;
        } else {
            sl = (v - l) / Math.min(l, 1 - l);
        }
    
        // Kembalikan nilai dalam format HSL
        const hsl = {
            h: Math.round(h * 360),
            s: Math.round(sl * 100),
            l: Math.round(l * 100)
        };
    
        return hsl;
    }


    return (
        <>
         <div className='m-6 h-[12rem] relative border-2 border-neutral-950 rounded-lg' id={`draggable-colors`}>
      
            <div className='w-full h-full absolute rounded-lg ' style={{ background: `linear-gradient(to top, hsla(0, 0%, 0%, 1), hsla(0, 0%, 100%, 1)`,}}>

            </div>

            <div className='w-full h-full absolute mix-blend-multiply rounded-lg ' style={{ background: `linear-gradient(to right, hsla(${(hslColor.h/100)*359}, 100%, 100%, 1), hsla(${(hslColor.h/100)*359}, 100%, 50%, 1)`,}}>

            </div>
            <Drag id={`draggable-colors`} setX={setColorPosX} setY={setColorPosY}  >

                {children == undefined? 
                <div className='w-[1.3rem] h-[1.3rem] rounded bg-white absolute rounded-full border-2 border-neutral-950' style={{left:`calc(${ColorPosX}% - 0.5rem)`, top:`calc(${ColorPosY}% - 0.5rem)`}} >

                </div>
                : 
                children
                }
                
            </Drag>


        </div>
        </>
    );
};

export default ColorSelect;