import React from 'react'
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import TaskState from './Context/Tasks/taskState'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/SignUp';
import { useState } from 'react';

function App() {
  const[alert, setAlert] = useState(null);

  const showAlert = (message,type) => {                                                                                                                         
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000)
  }
  return (
    <>
      <TaskState>
      <BrowserRouter>
      <Navbar/>
      <Alert alert = {alert}/>
      <div className="container my-3">
      <Routes>
        <Route path="/" element={<Home showAlert = {showAlert}/>} />
        <Route path="/login" element={<Login showAlert = {showAlert}/>} />
        <Route path="/signup" element={<Signup showAlert = {showAlert}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </TaskState>

    </>
  );
}

export default App;