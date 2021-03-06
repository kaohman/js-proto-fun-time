import React from 'react';

function Instructions() {
  return (
    <div className='instruction-container'>
      <h3>Instructions</h3>
      <p>Here's how to use this page to practice your prototype methods:</p>
      <ul>
        <li>Step 1: Read The Problem. Once you understand what the problem is asking, click on the Next Step button</li>
        <li>Step 2: Pick Your Method. Enter the best prototype method to solve this problem and then click on the Check Answer button to see if you are correct. If your answer is correct, click on the Next Step button. If your answer is incorrect, please try again!</li>
        <li>Step 3: Let's Solve The Problem. No we can code out the solution to the problem. Enter your answer in the text box and click the Check Answer button. If your answer is correct, click on the Next Problem button to move on to the next problem. If your answer is incorrect, please try again!</li>
      </ul>
      <p>If you are having trouble solving the problem, check out the documentation <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>HERE</a> for some help.</p>
    </div>
  )
}

export default Instructions;