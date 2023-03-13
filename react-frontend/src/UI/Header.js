import { Fragment } from 'react';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ToDoApp</h1>
        {props.title === 'Add Task' && (
          <button onClick={props.back}>Back</button>
        )}
        <button onClick={props.onAdd}>{props.title}</button>
      </header>
    </Fragment>
  );
};

export default Header;
