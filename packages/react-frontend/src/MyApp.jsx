// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters[index].id;
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.status === 204) {
       
        setCharacters(prevCharacters =>
          prevCharacters.filter(character => character.id !== id)
        );
      } else if (res.status === 404) {
        throw new Error("Resource not found.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function updateList(person) { 
    postUser(person)
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      });
}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then((res) => {
      if (res.status === 201) {
        return res.json();
      
      }
      else {
        throw new Error(`User insertion failed with status: ${res.status}`);
      }
      
    });
    
    return promise
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
