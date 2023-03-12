import React from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import ModuleItem from './module';

import classes from './moduleTable.module.css';

function ModuleTable(props) {
  function removeOneModule(mId) {
    makeDeleteCallModule(mId).then((result) => {
      if (result.status === 204) {
        const updated = props.moduleData.filter((module, i) => {
          return module.id !== mId;
        });
        props.setMod(updated);
      }
    });
  }

  async function makeDeleteCallModule(id) {
    try {
      const response = await axios.delete(
        'http://localhost:5000/modules/' + id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function returnTaskView(modId) {
    props.taskView(modId);
  }

  const modsList = props.moduleData.map((mod) => (
    <ModuleItem
      id={mod.id}
      key={mod.id}
      name={mod.title}
      taskView={returnTaskView}
      removeOne={removeOneModule}
      setMod={props.setMod}
    />
  ));
  return (
    <React.Fragment>
      <section className={classes.mods}>
        <Card color={'moduleColor'}>
          <ul>{modsList}</ul>
        </Card>
      </section>
    </React.Fragment>
  );
}

export default ModuleTable;
