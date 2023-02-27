import React, {useState} from 'react';

function taskForm(props) {

  const [Task, setTask] = useState(
     {
        title: "",
        description: "",
        category: "",
        duration: "", //may need to change to number?
        priority: "", //^

     }
     
  );


function handleChange(event) {
  //handles changes of any one field of a task
    const { name, value } = event.target;
    if (name === "title")
      setTask(
         {title: value, description: Task['description'],category: Task['category'],duration: Task['duration'],priority: Task['priority']}
      );
    else if (name === "description")
      setTask(
         {title: Task['title'], description: value,category: Task['category'],duration: Task['duration'],priority: Task['priority']}
      );
      else if (name === "category")
      setTask(
         {title: Task['title'], description: Task['description'],category: value,duration: Task['duration'],priority: Task['priority']}
      );
      else if (name === "duration")
      setTask(
         {title: Task['title'], description: Task['description'],category: Task['category'],duration: value,priority: Task['priority']}
      );
      else if (name === "priority")
      setTask(
         {title: Task['title'], description: Task['description'],category: Task['category'],duration: Task['duration'],priority: value}
      );
  }
  
  


  function submitForm() {
    props.handleSubmit(Task);
    setTask({title: '',description: '',category: '',duration: '',priority: ''});
  }
  
//return entry form to create a new task
return (
    <form>  
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        _id="title"
        value={Task.title}
        onChange={handleChange} />
      <label htmlFor="Description">Description</label>
      <input
        type="text"
        name="description"
        _id="description"
        value={Task.description}
        onChange={handleChange} />
        <label htmlFor="Category">Category</label>
      <input
        type="text"
        name="category"
        _id="category"
        value={Task.category}
        onChange={handleChange} />
        <label htmlFor="Duration">Duration</label>
      <input
        type="text"
        name="duration"
        _id="duration"
        value={Task.duration}
        onChange={handleChange} />
        <label htmlFor="Priority">Priority</label>
      <input
        type="text"
        name="priority"
        _id="priority"
        value={Task.priority}
        onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
        
    </form>
);
}




export default taskForm;