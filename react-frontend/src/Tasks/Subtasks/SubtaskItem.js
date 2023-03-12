import React, { useState } from 'react';
import classes from './SubtaskItem.module.css';

const data = ['Test step', 'Test step two'];

const SubtaskItem = (props) => {
  const [showRest, setShowRest] = useState(false);
  const priority_color = {
    1: classes.low,
    2: classes.lowMedium,
    3: classes.medium,
    4: classes.highMedium,
    5: classes.high
  };
  const bg_color = priority_color[props.priority];

  const steps = data.map((step, index) => (
    <div className={classes.step} key={index}>
      {/* {' '} */}
      <div className={classes.stepAlign}>
        <div className={classes.bulletPoint} />
        {step}
      </div>
    </div>
  ));
  // const steps = props.steps.map((step, index) => <h5 key={index}>{step}</h5>);

  const onShowRest = () => {
    setShowRest(!showRest);
  };

  return (
    <div className={classes.card} onClick={() => onShowRest()}>
      <div className={classes.topBar}>
        <div className={classes.date}>{props.date}</div>
        <div className={classes.circle}>
          <div className={bg_color}>!</div>
        </div>
      </div>
      <div className={classes.subtask}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.description}>{props.description}</div>
        {showRest && (
          <div>
            <div className={classes.steps}>{steps}</div>
            <button onClick={() => props.removeOne(props.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtaskItem;
