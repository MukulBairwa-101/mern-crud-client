import React from "react";
import {Routes,Route} from "react-router-dom";
import User from "./Components/User";
import Users from "./Components/Users";
import AddUser from "./Components/Adduser";
import Navbar  from "./Components/Navbar";
import './App.css';


function App() {
  return (
    <div className="App ">
      <Navbar />
      <Routes>
        <Route path ="/" element ={<Users />} />
        <Route path ="/user/:id" element ={<User />} />
        <Route path ="/adduser" element ={<AddUser />} />
      </Routes>
    </div>
  );
}



export default App;
