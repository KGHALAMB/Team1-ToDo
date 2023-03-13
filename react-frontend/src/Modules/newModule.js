import React, { useState } from 'react';
import ModuleForm from './moduleForm';
import Modal from '../UI/Modal';
import axios from 'axios';

import classes from './newModule.module.css';

const NewModule = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterModuleHandler = async (module) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://team1-todo2.azurewebsites.net/modules',
        module
      );
      if (response.status !== 201) {
        throw new Error('Request failed!');
      }
      const createdModule = { id: response.data._id, title: module.name };
      props.onAdded(createdModule);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  let content;

  if (!error) {
    content = (
      <React.Fragment>
        <div className={classes.add_text}>
          <span>Add Modal</span>
        </div>
        <ModuleForm
          onEnterModule={enterModuleHandler}
          loading={isLoading}
          onClose={props.onClose}
        />
      </React.Fragment>
    );
  } else {
    content = <p>{error}</p>;
  }

  return <Modal onClose={props.onClose}>{content}</Modal>;
};

export default NewModule;
