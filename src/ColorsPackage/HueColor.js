import React,{useState, useContext, useEffect} from 'react';
import { ColorContext } from './ColorEditor';
import Drag from "react-drag-anp";
const HueColor = ({getHue}) => {

    const [xpos, setXpos] = useState(0);
    const {
        hue,
        setHue,
        hslColor,
        setHslColor
    } = useContext(ColorContext);

   

    useEffect(()=>{
        if(getHue == null || getHue == undefined){
        
        }else{
            getHue(hue)
        }
      
    },[hue])


    return (
        <>
        
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
                <Drag id={`draggable-color-editor`} setX={setHue} vertical={false}>
                <div  className='select-none cursor-move absolute h-[1rem] w-[1rem] bg-white rounded-full border-2 border-neutral-950 ' style={{left:`calc(${hue}% - 0.5rem)`}}> 

                </div>
                </Drag>
                
    </div>
        
        </>
    );
};

export default HueColor;