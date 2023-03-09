import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  // <tr key={index}>
  //   <td>{row.title}</td>
  //   <td>{row.category}</td>
  //   <td>{row.duration}</td>
  //   <td>{row.status}</td>
  //   <td>
  //     <button /*onClick={() => props.removeTask(index)}*/>Delete</button>
  //   </td>
  //   <td>
  //     <button>Mark As Done</button>
  //   </td>
  // </tr>

  return (
    <li className={classes.task}>
      <div>
        <h3>{props.title}</h3>
        <div>
          <h4>{props.description}</h4>
          <h4>{props.categorty}</h4>
          <h4>{props.duration}</h4>
          <h4>{props.status}</h4>
        </div>
        <button onClick={() => props.removeOne(props.id)}>Delete</button>
        <button>Done</button>
      </div>
    </li>
  );
};

export default TaskItem;
