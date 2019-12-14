import React, { Component } from 'react'
function FilterP(props){  
    console.log(props)
    return (
      
        <div>
             {props.children}
        </div>
    )
}

function RadioGroup(props){
    //将name属性赋值给所有的子元素
    
   return (
       <>
       {/* child是个vdom vdom 不可更改属性  */}
       { React.Children.map(props.children,
          child=>React.cloneElement(child,{name:props.name})
        ) }
       </>
   )
}
function Radio(props){
   return(
       <label>
           <input type="radio" name={props.name}/>
           {props.children}        
       </label>
   )
}

export default function Compistions(){
    return(
        <>
          <FilterP>
              <h1>huiii</h1>
              <p>djeufw8</p>
          </FilterP>

          <RadioGroup name="mvvm">
              <Radio value="vue">vue</Radio>
              <Radio value="react">React</Radio>
              <Radio value="angular"> angular</Radio>
          </RadioGroup>
        </>
    )
}