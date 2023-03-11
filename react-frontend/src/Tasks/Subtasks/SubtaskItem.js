import React from 'react';
import classes from './SubtaskItem.module.css';

const SubtaskItem = (props) => {
  const priority_color = {
    1: classes.low,
    2: classes.lowMedium,
    3: classes.medium,
    4: classes.highMedium,
    5: classes.high
  };

  const bg_color = priority_color[props.priority];
  return (
    <React.Fragment>
      <div className={classes.topBar}>
        <div className={classes.date}>{props.date}</div>
        <div className={classes.circle}>
          <div className={bg_color}>!</div>
        </div>
      </div>
      <div className={classes.task}>
        <div className={classes.line} />
        <div>
          <h3>{props.title}</h3>
          <h4>{props.description}</h4>
          <h4>{props.category}</h4>
          <button onClick={() => props.removeOne(props.id)}>Delete</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubtaskItem;
