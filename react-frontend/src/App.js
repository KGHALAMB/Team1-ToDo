import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Table from './Table';
import Form from './taskForm';
import axios from 'axios';
function MyApp() {
  const [characters, setCharacters] = useState([]);
  function removeOneCharacter(index) {
    const person = characters[index]._id;
    makeDeleteCall(person).then((result) => {
      if (result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    });
  }
  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
      console.log(result);
    });
  }
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
      console.log(characters);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      return response.data.tasks_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:5000/tasks', person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete('http://localhost:5000/tasks/' + id);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

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
              <Link to="/tasks-table">List all</Link>
            </li>
            <li>
              <Link to="/task-form">Insert one</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/tasks-table"
            element={
              <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
              />
            }
          />
          <Route
            path="/task-form"
            element={<Form handleSubmit={updateList} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default MyApp;
