import React from "react";

function Option(props){
  if(!props.isChecked){
    let fillBackground = {}
  if(props.isHeld){
    fillBackground= {
      backgroundColor: '#D6DBF5'
    }
  }
  return (
    <div className="option" style={fillBackground} onClick={props.selectOption}>
      {props.value}
    </div>
  );
  }
  else{
    let fillBackground ={}
    if(props.isHeld && !props.isAnswer){
        fillBackground = {
          backgroundColor: '#F8BCBC',
          opacity: 0.5
        }
    }
    else if(props.isAnswer){
      fillBackground = {
        backgroundColor: '#94D7A2'
      }
    }
    else{
      fillBackground = {
        backgroundColor: 'White',
        opacity: 0.5
      }
    }
    return (
      <div className="option" style={fillBackground}>
        {props.value}
      </div>
    );

  }
}

export default Option;