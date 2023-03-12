import React, { useState } from 'react';

import classes from './SubtaskForm.module.css';

function SubtaskForm(props) {
  const [Subtask, setSubtask] = useState({
    title: '',
    description: '',
    category: '',
    date: '', //may need to change to number?
    priority: '3', //^
    steps: []
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'title')
      setSubtask({
        title: value,
        description: Subtask['description'],
        category: Subtask['category'],
        date: Subtask['date'],
        priority: Subtask['priority'],
        steps: Subtask['steps']
      });
    else if (name === 'description')
      setSubtask({
        title: Subtask['title'],
        description: value,
        category: Subtask['category'],
        date: Subtask['date'],
        priority: Subtask['priority'],
        steps: Subtask['steps']
      });
    else if (name === 'category')
      setSubtask({
        title: Subtask['title'],
        description: Subtask['description'],
        category: value,
        date: Subtask['date'],
        priority: Subtask['priority'],
        steps: Subtask['steps']
      });
    else if (name === 'date')
      setSubtask({
        title: Subtask['title'],
        description: Subtask['description'],
        category: Subtask['category'],
        date: value,
        priority: Subtask['priority'],
        steps: Subtask['steps']
      });
    else if (name === 'priority')
      setSubtask({
        title: Subtask['title'],
        description: Subtask['description'],
        category: Subtask['category'],
        date: Subtask['date'],
        priority: value,
        steps: Subtask['steps']
      });
    else if (name === 'steps')
      setSubtask({
        title: Subtask['title'],
        description: Subtask['description'],
        category: Subtask['category'],
        date: Subtask['date'],
        priority: Subtask['priority'],
        steps: value
      });
  }

  function submitForm() {
    props.onAdd(Subtask);
    setSubtask({
      title: '',
      description: '',
      category: '',
      date: '',
      priority: '',
      steps: []
    });
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        _id="title"
        value={Subtask.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        _id="description"
        value={Subtask.description}
        onChange={handleChange}
      />
      <label htmlFor="Category">Category</label>
      <input
        type="text"
        name="category"
        _id="category"
        value={Subtask.category}
        onChange={handleChange}
      />
      <label htmlFor="Date">Date</label>
      <input
        type="date"
        name="date"
        _id="date"
        value={Subtask.date}
        onChange={handleChange}
      />
      <label htmlFor="Priority">Priority</label>
      <div className={classes.sliderContainer}>
        <input
          type="range"
          min="1"
          max="5"
          className={classes.slider}
          name="priority"
          _id="priority"
          value={Subtask.priority}
          onChange={handleChange}
        />
      </div>
      <div className={classes.sliderHeader}>
        <p>Low</p>
        <p>Medium</p>
        <p>High</p>
      </div>
      <input type="button" value="Submit" onClick={submitForm} />
      <button onClick={props.onClose}>Close</button>
    </form>
  );
}

export default SubtaskForm;
