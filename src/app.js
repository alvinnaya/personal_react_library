import React, {useState} from "react";
import Drag from "./drag/drag";
import {ColorEditor,HueColor,ColorSelect,ColorPreview} from "color-editor-anp";


const App = () =>{
    const [state, setState] = useState(0)
    const [hsl, setHsl] = useState({h: 0, s: 0, l: 0});
    const [x, setX] = useState(0)
    const [y,setY] = useState(0)
    return (
        <>

<div  className='w-full h-[50%] flex-col'>
    <ColorEditor getHsl={setHsl}>
        <ColorSelect>
        </ColorSelect>
        <HueColor>
        </HueColor>
        
    </ColorEditor>
  
</div>

        <h1 className="font-extrabold text-4xl"
        style={{color:`hsla(${(hsl.h/100)*359}, ${hsl.s}%, ${hsl.l}%, 1)`}}
        >
            {`Hello world! I am using  ${state}`}
        </h1>
       

        <button onClick={()=>{setState(state + 1)}}>
            click
        </button>

        <div className="bg-slate-700" style={{ width:"800px", height:"800px"}}>
<div id="container00" style={{with:"100%",height:"100%", position:"relative"}}>
    <Drag X={x} Y={y} getX={setX} getY={setY}  id={"container00"} inside={true}>
    
    <div style={{backgroundColor:"black",width:"40px",height:"40px"}}>

    </div>
    </Drag>

</div>

</div>





        </>
      
    )
}

export default App;