import React from 'react';

function Step1(props) {
  return (
    <div className='step-containers'>
      <div>
        <h3>Step 1: Read The Problem</h3>
        <p>{props.question}</p>
      </div>
      {
        props.currentStep === 1 && <button onClick={props.incrementStep}>Next Step</button>
      }
    </div>
  )
}

export default Step1;