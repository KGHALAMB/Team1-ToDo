import classes from './module.module.css';

const ModuleItem = (props) => {
  // console.log(props.id);
  return (
    <li className={classes.mod}>
      <div>
        <h3>{props.name}</h3>
        <button onClick={() => props.taskView(props.id)}>{props.name}</button>
        <button>Share</button>
        <button onClick={() => props.removeOne(props.id)}>Delete</button>
      </div>
    </li>
  );
};

export default ModuleItem;
