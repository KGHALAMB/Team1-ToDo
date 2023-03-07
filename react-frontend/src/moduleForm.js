import React, { useState } from 'react';

function ModuleForm(props) {
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
    props.handleSubmit(Module);
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
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default ModuleForm;
