import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
import SearchTodo from "./components/search-todo.component";
import logo from "./logo.png";
function App() {
  return (
    <Router>
    <div className="container">
          
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="https://www.google.co.in/" target="_blank">
        <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
      </a>
      <Link to="/" className="navbar-brand">MERN-Stack Contacts App</Link>
      <div className="collpase nav-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Contacts List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Contact</Link>
          </li>
          <li className="navbar-item">
            <Link to="/search" className="nav-link">Search Contact</Link>
          </li>
        </ul>
      </div>
    </nav>

    <Route path="/" exact component={TodosList} />
    <Route path="/edit/:id" component={EditTodo} />
    <Route path="/create" component={CreateTodo} />
    <Route path="/delete/:id" component={DeleteTodo} />
  </div>
    </Router>
  );
}

export default App;
