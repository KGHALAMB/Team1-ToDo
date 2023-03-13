import React, { useState } from 'react';

import classes from './moduleForm.module.css';

// import classes from './TaskForm.module.css';

const ModuleForm = (props) => {
  const [Module, setModule] = useState({
    name: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'name')
      setModule({
        name: value
      });
  }

  function submitForm() {
    props.onEnterModule(Module);
    setModule({
      name: ''
    });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        _id="name"
        value={Module.name}
        onChange={handleChange}
      />
      <div className={classes.actions}>
        <input type="button" value="Submit" onClick={submitForm} />
        <button onClick={props.onClose}>Close</button>
      </div>
    </form>
  );
};

export default ModuleForm;
