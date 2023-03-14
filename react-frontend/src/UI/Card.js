import classes from './Card.module.css';

const background_color = {
  moduleColor: classes.moduleColor,
  taskColor: classes.taskColor,
  subtaskColor: classes.subtaskColor
};

// const bg_color

const Card = (props) => {
  return (
    <div className={classes.card}>
      <div className={background_color[props.color]}>{props.children}</div>
    </div>
  );
};

export default Card;
