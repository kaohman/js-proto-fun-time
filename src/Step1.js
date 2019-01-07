import React from 'react';

function Step1(props) {
  return (
    <div className='step-containers' id='step-1-container'>
      <div>
        <h3>Step 1: Read The Problem</h3>
        <p className='question-text'>{props.question}</p>
      </div>
      {
        props.currentStep === 1 && 
        <button onClick={props.incrementStep}>Next Step</button>
      }
    </div>
  )
}

export default Step1;