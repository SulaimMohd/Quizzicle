import React from "react";
import Option from './Option';


function QCard(props){
    if(!props.checked){
        const optionsElemnt = props.options.map(option => (<Option 
                                                                value={option.value}
                                                                isHeld={option.isSelected}
                                                                selectOption={()=>props.selectOption(props.id, option.index, option.value)}
                                                                isChecked = {props.checked}
                                                              />))

      return (
              <div className="q-card">
              <h1>
              {
              props.question
              }
              </h1>
              <div className="options-div">
              {optionsElemnt}
              </div>

              <hr />
              </div>
        );
  }
  else{
    const optionsElemnt = props.options.map(option => (<Option 
                                                            isChecked={props.checked}
                                                            value ={option.value}
                                                            isHeld={option.isSelected}
                                                            isAnswer={option.isCorrect}
                                                            
                                                        />));
    return (
      <div className="q-card">
          <h1>
            {
              props.question
            }
          </h1>
            <div className="options-div">
              {optionsElemnt}
            </div>
              
          <hr />
      </div>
    );
  }
  
}

export default QCard;