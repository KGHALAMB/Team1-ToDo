import React, { useState, useEffect, useCallback } from 'react';
import ModuleTable from './moduleTable';
import Header from '../UI/Header';
import NewModule from './newModule';
import axios from 'axios';

function ModView(props) {
  const [modules, setModules] = useState([]);
  const [addIsShown, setAddIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getModulesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://team1-todo2.azurewebsites.net/modules');
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      const data = await response.data.modules_list;
      const loadedModules = [];

      for (const index in data) {
        loadedModules.push({
          id: data[index]._id,
          title: data[index].name
        });
      }

      setModules(loadedModules);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getModulesHandler();
  }, [getModulesHandler]);

  const moduleAddHandler = (module) => {
    setModules([...modules, module]);
    setAddIsShown(false);
  };

  const returnTaskView = (modId) => {
    props.taskView(modId);
  };

  const showAddHandler = () => {
    setAddIsShown(true);
  };

  const hideAddHandler = () => {
    setAddIsShown(false);
  };

  let content = <p>Found no modules.</p>;

  if (modules.length > 0) {
    content = (
      <React.Fragment>
        <ModuleTable
          moduleData={modules}
          taskView={returnTaskView}
          setMod={setModules}
        />
      </React.Fragment>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (modules)
    return (
      <React.Fragment>
        {addIsShown && (
          <NewModule onAdded={moduleAddHandler} onClose={hideAddHandler} />
        )}
        <Header onAdd={showAddHandler} title="Add Module" />
        <section>{content}</section>
      </React.Fragment>
    );
}

export default ModView;
