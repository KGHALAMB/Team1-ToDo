import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ModuleTable from './moduleTable';
import ModuleForm from './moduleForm';
import TaskTable from './taskTable';
import TaskForm from './taskForm';
import axios from 'axios';
function MyApp() {
  /*const [tasks, setTasks] = useState([]);
  function removeOneTask(index) {
    const task = tasks[index]._id;
    makeDeleteCallTask(task).then((result) => {
      if (result.status === 204) {
        const updated = tasks.filter((task, i) => {
          return i !== index;
        });
        setTasks(updated);
      }
    });
  }
  function updateTaskList(task) {
    makePostCallTask(task).then((result) => {
      if (result && result.status === 201) setTasks([...tasks, result.data]);
      console.log(result);
    });
  }
  useEffect(() => {
    fetchAllTasks().then((result) => {
      if (result) setTasks(result);
      console.log(tasks);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllTasks() {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      return response.data.tasks_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function makePostCallTask(task) {
    try {
      const response = await axios.post("http://localhost:5000/tasks", task);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function makeDeleteCallTask(id) {
    try {
      const response = await axios.delete('http://localhost:5000/tasks/' + id);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  */

  // modules
  const [modules, setModules] = useState([]);
  function removeOneModule(index) {
    const module = modules[index]._id;
    makeDeleteCallModule(module).then((result) => {
      if (result.status === 204) {
        const updated = modules.filter((module, i) => {
          return i !== index;
        });
        setModules(updated);
      }
    });
  }
  function updateModuleList(module) {
    makePostCallModule(module).then((result) => {
      if (result && result.status === 201)
        setModules([...modules, result.data]);
      console.log(result);
    });
  }
  useEffect(() => {
    fetchAllModules().then((result) => {
      if (result) setModules(result);
      console.log(modules);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllModules() {
    try {
      const response = await axios.get('http://localhost:5000/modules');
      return response.data.modules_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  /*async function fetchModule(id) {
    try {
      const response = await axios.get(
        "http://localhost:5000/modules/" + id + "/tasks"
      );
      console.log(response.data.modules_list.tasks_list);
      return response.data.modules_list.tasks_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }*/
  async function makePostCallModule(module) {
    try {
      const response = await axios.post(
        'http://localhost:5000/modules',
        module
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
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

  // module tasks
  const [tasks, setTasks] = useState([]);
  function removeOneTask(index) {
    const task = tasks[index]._id;
    makeDeleteCallTask(task).then((result) => {
      if (result.status === 204) {
        const updated = tasks.filter((task, i) => {
          return i !== index;
        });
        setTasks(updated);
      }
    });
  }
  function updateTaskList(task) {
    makePostCallTask(task).then((result) => {
      if (result && result.status === 201) setTasks([...tasks, result.data]);
      console.log(result);
    });
  }
  useEffect(() => {
    fetchAllTasks().then((result) => {
      if (result) setTasks(result);
      console.log(tasks);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllTasks(mid) {
    try {
      let mod_id = modules[mid]._id;
      console.log(modules);
      const response = await axios.get(
        'http://localhost:5000/modules/' + mod_id
      );
      console.log(response);
      return response.data;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function makePostCallTask(mid, task) {
    try {
      const response = await axios.post(
        'http://localhost:5000/modules/' + mid + '/tasks',
        task
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function makeDeleteCallTask(mid, tid) {
    try {
      const response = await axios.delete(
        'http://localhost:5000/modules/' + mid + '/tasks/' + tid
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    // This is what we had before:
    /**<div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>**/
    // update basename below when deploying to gh-pages
    <div className="container">
      <h1>Choose your path!</h1>
      <BrowserRouter basename="/">
        <nav>
          <ul>
            <li>
              <Link to="/modules">List Modules</Link>
            </li>
            <li>
              <Link to="/modules/form">Create Module</Link>
            </li>
            <li>
              <Link to="/tasks">List Tasks</Link>
            </li>
            <li>
              <Link to="/tasks/form">Create Task</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/modules"
            element={
              <ModuleTable
                moduleData={modules}
                fetchAllTasks={fetchAllTasks}
                removeModule={removeOneModule}
              />
            }
          />
          <Route
            path="/modules/form"
            element={<ModuleForm handleSubmit={updateModuleList} />}
          />
          <Route
            path="/modules/:id"
            element={
              <TaskTable
                fetchAllTasks={fetchAllTasks}
                removeTask={removeOneTask}
              />
            }
          />
          <Route
            path="/modules/:id/tasks/form"
            element={<TaskForm handleSubmit={updateTaskList} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default MyApp;
