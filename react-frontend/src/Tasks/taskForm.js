import React, { useState } from 'react';

function TaskForm(props) {
  const [Task, setTask] = useState({
    title: '',
    subtasks: []
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'title')
      setTask({
        title: value,
        subtasks: []
      });
  }

  function submitForm() {
    props.onAdd(Task);
    setTask({
      title: '',
      subtasks: []
    });
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        _id="title"
        value={Task.title}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
      <button onClick={props.onClose}>Close</button>
    </form>
  );
}

export default TaskForm;
