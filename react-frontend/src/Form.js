import React, { useState } from "react";

function Form(props) {
  const [task, setTask] = useState({
    task: "",
    category: "",
    time: ""
  });
  function submitForm() {
    console.log("hello2");
    props.handleSubmit(task);
    setTask({ task: "", category: "", time: "" });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    console.log("hello");
    if (name === "task") {
      console.log("task");
      setTask({ task: value, category: task["category"], time: task["time"] });
    }
    if (name === "category")
      setTask({ task: task["task"], category: value, time: task["time"] });
    else {
      console.log("time");
      setTask({ task: task["task"], category: task["category"], time: value });
    }
  }
  return (
    <form>
      <label htmlFor="task">Task</label>
      <input
        type="text"
        name="task"
        id="task"
        value={task.task}
        onChange={handleChange}
      />
      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        id="category"
        value={task.category}
        onChange={handleChange}
      />
      <label htmlFor="time">Time</label>
      <input
        type="text"
        name="time"
        id="time"
        value={task.time}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}
export default Form;
