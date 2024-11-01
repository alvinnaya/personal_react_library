import React, { useState,useRef, useEffect } from 'react';
import Drag from "react-drag-anp";


const ColorPicker = ({getColor}) => {

const [xpos, setXpos] = useState(0);
const [hslColor, setHslColor] = useState({h: 0, s: 0, l: 0});
const [ColorPosX, setColorPosX] = useState(0);
const [ColorPosY, setColorPosY] = useState(0);
const componentRef = useRef(null)
const colorRef = useRef(null)

useEffect(()=>{
    const newHslColor = hsvToHsl(xpos, ColorPosX, (100-ColorPosY));
    const HexColor = hsvToHex(xpos/100, ColorPosX/100, (100-ColorPosY)/100)
    
    setHslColor(newHslColor)
    console.log('hex',HexColor)
    setXpos(xpos)
    if(getColor == null || getColor == undefined){
        
    }else{
        getColor(hslColor);
    }
},[xpos,ColorPosX,ColorPosY])

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


function hsvToHex(H, S, V) {
    // Convert HSV to RGB
    let C = V * S;
    let X = C * (1 - Math.abs(((H / 60) % 2) - 1));
    let m = V - C;

    let R1, G1, B1;
    if (H >= 0 && H < 60) {
        R1 = C;
        G1 = X;
        B1 = 0;
    } else if (H >= 60 && H < 120) {
        R1 = X;
        G1 = C;
        B1 = 0;
    } else if (H >= 120 && H < 180) {
        R1 = 0;
        G1 = C;
        B1 = X;
    } else if (H >= 180 && H < 240) {
        R1 = 0;
        G1 = X;
        B1 = C;
    } else if (H >= 240 && H < 300) {
        R1 = X;
        G1 = 0;
        B1 = C;
    } else {
        R1 = C;
        G1 = 0;
        B1 = X;
    }

    let R = Math.round((R1 + m) * 255).toString(16).padStart(2, '0');
    let G = Math.round((G1 + m) * 255).toString(16).padStart(2, '0');
    let B = Math.round((B1 + m) * 255).toString(16).padStart(2, '0');

    // Concatenate and return the RGB value in hexadecimal
    return `#${R}${G}${B}`;
}



    return (
<div className='w-full h-[50%] flex-col'>

    <div className='w-full h-[3rem]' style={{backgroundColor:`hsla(${(hslColor.h/100)*359}, ${hslColor.s}%, ${hslColor.l}%, 1)`,}}>

    </div>
    <div className='m-6 h-[12rem] relative border-2 border-neutral-950 rounded-lg' id={`draggable-colors`}>
      
            <div className='w-full h-full absolute rounded-lg ' style={{ background: `linear-gradient(to top, hsla(0, 0%, 0%, 1), hsla(0, 0%, 100%, 1)`,}}>

            </div>

            <div className='w-full h-full absolute mix-blend-multiply rounded-lg ' style={{ background: `linear-gradient(to right, hsla(${(hslColor.h/100)*359}, 100%, 100%, 1), hsla(${(xpos/100)*359}, 100%, 50%, 1)`,}}>

            </div>
        <Drag id={`draggable-colors`} setX={setColorPosX} setY={setColorPosY}  componentRef={colorRef}>
            <div className='w-[1.3rem] h-[1.3rem] rounded bg-white absolute rounded-full border-2 border-neutral-950' style={{left:`calc(${ColorPosX}% - 0.5rem)`, top:`calc(${ColorPosY}% - 0.5rem)`}} ref={colorRef}>

            </div>
        </Drag>
    

    </div>
    {/* color bar */}
    <div id={`draggable-color-editor`} className='m-6 h-[1rem] relative rounded-l-full  select-none'>
                <div className='w-full h-full absolute rounded-l-full rounded-r-full border-2 border-neutral-950' style={{background:` linear-gradient(90deg,
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 154, 0, 1) 10%,
            rgba(208, 222, 33, 1) 20%,
            rgba(79, 220, 74, 1) 30%,
            rgba(63, 218, 216, 1) 40%,
            rgba(47, 201, 226, 1) 50%,
            rgba(28, 127, 238, 1) 60%,
            rgba(95, 21, 242, 1) 70%,
            rgba(186, 12, 248, 1) 80%,
            rgba(251, 7, 217, 1) 90%,
            rgba(255, 0, 0, 1) 100%)`}}>

                </div>
                <Drag id={`draggable-color-editor`} setX={setXpos} vertical={false}>
                <div  className='select-none cursor-move absolute h-[1rem] w-[1rem] bg-white rounded-full border-2 border-neutral-950 ' style={{left:`calc(${xpos}% - 0.5rem)`}}> 

                </div>
                </Drag>
                
    </div>

    <div className='w-full h-[3rem] '>
        {`hex`}
    </div>
</div>
    );
};

export default ColorPicker;