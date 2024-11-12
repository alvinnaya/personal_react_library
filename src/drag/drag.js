
import React, {  useEffect, useRef, useState } from 'react';

const Drag = ({id,getX,getY,children,inside = true,horizontal = true,vertical = true, X,Y, getGlobalX,getGlobalY}) =>{


    const currentMouseX = useRef(null);
    const currentMouseY = useRef(null);
    const isDraggingRef = useRef(false);
    const componentRef = useRef(null)
    
    const [top,setTop]= useState(0)
    const [left,setLeft]= useState(0)

    


    const setXpos = (X)=>{
      
      setLeft(X)
      if(getX == null || getX == undefined){
  
      }else{
        getX(X)
      }
    }

    const setYpos = (Y)=>{
      setTop(Y)
      if(getY == null || getY == undefined){
        console.log(Y)
      }else{
        getY(Y)
      }
    }


    const handleMouseDown = (e) => {
     
        const container = document.getElementById(`${id}`);
        const containerRect = container.getBoundingClientRect();

        const LeftPosGlob = e.clientX
        const TopPosGlob = e.clientY


        
        isDraggingRef.current = true;
        const offsetX = LeftPosGlob - containerRect.left; //( nilai posisi mouse kiri dalam container) posisi kiri mouse di kurang posisi kiri container
        currentMouseX.current = offsetX - componentRef.current.offsetLeft; // posisi mouse kiri dalam objek
        const offsetY = TopPosGlob - containerRect.top; 
        currentMouseY.current = offsetY - componentRef.current.offsetTop; // posisi mouse atas dalam objek

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("focus", () => console.log("focus"));
      };


      const handleMouseMove = (e) => {

        if (isDraggingRef.current) {
          const container = document.getElementById(`${id}`);
          const containerRect = container.getBoundingClientRect();

          const LeftPosGlob = e.clientX
          const TopPosGlob = e.clientY
          
          const offsetX = LeftPosGlob - containerRect.left; // posisi mouse dalam container ()
          const offsetY = TopPosGlob - containerRect.top;
  
          const lengthX = componentRef.current.offsetLeft;
  
          // console.log("X", lengthX);
          const ComponentOffsetX = offsetX - currentMouseX.current; // posisi mouse di tambah selisih posisi objek dengan mouse mula-mula
          const ComponentOffsetY = offsetY - currentMouseY.current;
  
          const xPercent = (ComponentOffsetX / containerRect.width) * 100; //presentase posisi
          const yPercent = (ComponentOffsetY / containerRect.height) * 100;


          if(getGlobalX !== null && getGlobalX !== undefined){
            getGlobalX(componentRef.current.offsetLeft)
          } 

          if(getGlobalY !== null && getGlobalY !== undefined){
            getGlobalY(componentRef.current.offsetTop)
          } 

          if(inside){
console.log("X", lengthX )

            if(!(xPercent >= (100-(componentRef.current.offsetWidth/containerRect.width)*100 )) && !(xPercent <= 0) ){
              console.log('jalan')
              if(horizontal){
                setXpos(xPercent)
              }
              
            }
  
            if(!(yPercent >= (100 - (componentRef.current.offsetHeight/containerRect.height)*100 )) && !(yPercent <= 0) ){
              if(vertical){
                setYpos(yPercent)
              }
              
            }

          }else {

            if(vertical){
              setYpos(yPercent)
            }
  
            if(horizontal){
              setXpos(xPercent)
            }
          }
         

        }
      
        
      }


      const handleMouseUp = () => {
    
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp)
        
        
      };


      const firstChild = React.Children.toArray(children)[0];

      // Jika ada elemen pertama, clone dan modifikasi
      // const modifiedFirstChild = firstChild 
      //   ? React.cloneElement(firstChild, { ref: componentRef, style: {...firstChild.props.style, top:`${top}%`, left:`${left}%`}, 
      //     onMouseDown: (e) =>{handleMouseDown(e) } },) 
      //   : null;

      // const childrenWithRef = React.isValidElement(children[0])
          // ? React.cloneElement(children[0], { ref: childRef })
          // : children[0]
      
          // console.log(firstChild.prop)

    return (
      
        <>
        <div ref={componentRef} style={{top:`${Y == undefined? top:Y}%`, left:`${X == undefined? left:X}%`, position:'absolute',width: 'maxContent'}}  onMouseDown ={ (e) =>{handleMouseDown(e) }} >
        {children}
        </div>
        </>
      
    )
}

export default Drag;