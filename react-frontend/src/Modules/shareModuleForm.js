import React, { useState } from 'react';

import classes from './moduleForm.module.css';

const shareModuleForm = (props) => {
  const [Module, setSharedModule] = useState({
    user_list: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'user_list')
      setSharedModule({
        user_list: value
      });
  }

  function submitForm() {
    props.onEnterSharedModule(Module);
    setSharedModule({
      user_list: ''
    });
  }

  return (
    <form>
      <label htmlFor="name">Share to:</label>
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