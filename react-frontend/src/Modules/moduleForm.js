import React, { useState } from 'react';

import classes from './moduleForm.module.css';

// import classes from './TaskForm.module.css';

const ModuleForm = (props) => {
  const [Module, setModule] = useState({
    name: '',
    user_list: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'name') {
      setModule({
        name: value,
        user_list: Module['user_list']
      });
    } else if (name == 'user_list') {
      setModule({
        name: Module['name'],
        user_list: value
      });
    }
  }

  function submitForm() {
    props.onEnterModule(Module);
    setModule({
      name: '',
      user_list: ''
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
      <label htmlFor="user_list">Share with:</label>
      <input
        type="text"
        name="user_list"
        _id="user_list"
        value={Module.user_list}
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
