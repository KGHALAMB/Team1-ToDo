import React, { useState } from 'react';

function StepsFields(props) {
  const [numFields, setNumFields] = useState([1]);
  // const [stepsFields, setStepsFields] =

  console.log(numFields);

  const fields = numFields.map((i, index) => (
    <div /*className={classes.flexItem}*/ key={index}>
      <input
        type="step"
        name={'step' + index}
        _id={index}
        // value={Subtask.date}
        // onChange={handleChange}
      />
    </div>
  ));

  function addStep() {
    setNumFields([...numFields, 1]);
    props.addStep();
  }

  return (
    <React.Fragment>
      <label htmlFor="Steps">Steps</label>
      {fields}
      <button onClick={() => addStep()}>+</button>
    </React.Fragment>
  );
}

export default StepsFields;
