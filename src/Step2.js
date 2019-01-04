import React from 'react';

function Step2(props) {
  return (
    <div className='step-containers'>
      <div>
        <h3>Step 2: Pick Your Prototype</h3>
        <p>Which prototype is best to use for this problem (ex. sort)?</p>
        <label>Answer:
          <input></input>
        </label>
      </div>
      <button>Check Answer</button>
    </div>
  )
}

export default Step2;