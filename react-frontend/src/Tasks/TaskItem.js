import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  return (
    <li className={classes.task}>
      <div>
        <h3>{props.title}</h3>
        <h4>{props.description}</h4>
        <h4>{props.categorty}</h4>
        <h4>{props.duration}</h4>
        <h4>{props.priority}</h4>
        <button onClick={() => props.removeOne(props.id)}>Delete</button>
        <button>Done</button>
      </div>
    </li>
  );
};

export default TaskItem;
