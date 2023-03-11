import React, { useState } from 'react';

import classes from './taskForm.module.css';

function TaskForm(props) {
  const [Task, setTask] = useState({
    title: '',
    subtasks: []
    // description: '',
    // category: '',
    // duration: '', //may need to change to number?
    // priority: '3' //^
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'title')
      setTask({
        title: value,
        subtasks: []
        // description: Task['description'],
        // category: Task['category'],
        // duration: Task['duration'],
        // priority: Task['priority']
      });
    // else if (name === 'description')
    //   setTask({
    //     title: Task['title'],
    //     description: value,
    //     category: Task['category'],
    //     duration: Task['duration'],
    //     priority: Task['priority']
    //   });
    // else if (name === 'category')
    //   setTask({
    //     title: Task['title'],
    //     description: Task['description'],
    //     category: value,
    //     duration: Task['duration'],
    //     priority: Task['priority']
    //   });
    // else if (name === 'duration')
    //   setTask({
    //     title: Task['title'],
    //     description: Task['description'],
    //     category: Task['category'],
    //     duration: value,
    //     priority: Task['priority']
    //   });
    // else if (name === 'priority')
    //   setTask({
    //     title: Task['title'],
    //     description: Task['description'],
    //     category: Task['category'],
    //     duration: Task['duration'],
    //     priority: value
    //   });
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
      {/* <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        _id="description"
        value={Task.description}
        onChange={handleChange}
      />
      <label htmlFor="Category">Category</label>
      <input
        type="text"
        name="category"
        _id="category"
        value={Task.category}
        onChange={handleChange}
      />
      <label htmlFor="Duration">Date</label>
      <input
        type="date"
        name="duration"
        _id="duration"
        value={Task.duration}
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
          value={Task.priority}
          onChange={handleChange}
        />
      </div>
      <div className={classes.sliderHeader}>
        <p>Low</p>
        <p>Medium</p>
        <p>High</p>
      </div>*/}
      <input type="button" value="Submit" onClick={submitForm} />
      <button onClick={props.onClose}>Close</button>
    </form>
  );
}

export default TaskForm;
