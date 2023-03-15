import { Fragment } from 'react';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 onClick={props.back}>ToDoApp</h1>
        <button onClick={props.onAdd}>{props.title}</button>
      </header>
    </Fragment>
  );
};

export default Header;
