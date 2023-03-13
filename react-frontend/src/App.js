import React, { useState } from 'react';
import ModView from './Modules/modView';
import TaskView from './Tasks/taskView';

function MyApp() {
  const [moduleId, setModId] = useState([]);
  const [isModView, setIsModView] = useState(true);
  const [isTaskView, setIsTaskView] = useState(false);

  function handleTaskView(modId) {
    setIsModView(false);
    setIsTaskView(true);
    setModId(modId);
  }

  function backFromTaskList() {
    setIsModView(true);
    setIsTaskView(false);
  }

  let content;

  if (isModView) {
    content = <ModView taskView={handleTaskView} />;
  } else if (isTaskView) {
    content = <TaskView modId={moduleId} back={backFromTaskList} />;
  }

  return (
    <React.Fragment>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default MyApp;
