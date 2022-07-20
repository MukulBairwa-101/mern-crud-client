import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUsers,addUser,deleteUser,getUser ,updateUser , filterUserList} from "../Redux/Actions";

const Users = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer?.users);
  useEffect(() => {  
     axios({ method: "GET", url: "http://localhost:5000/users" }).then(
        (res) => {
          // console.log(res.data, "response-data");  
          dispatch(getUsers(res.data.users));  
        } 
        ); 
       
    }, []);
  



  // handlers


  const viewUser = (id) => {
    navigate(`/user/${id}`);

    let payloadObject = {
      mode:{
        isEditMode:false,
        isViewMode:true,
    },
    payloadData:{}
    }

    axios({ method: "GET", url: `http://localhost:5000/users/${id}`,id }).then((res=>{
      payloadObject.payloadData = res.data.user;
      
      dispatch(getUser(payloadObject));
    }))
    
  };

  // const updateUser = (id) => {
  //   navigate(`/user/${id}`);
  //   viewUser(id);
  // };

  const deleteuser = (id) => {
    console.log(id);
    dispatch(deleteUser(id));
  };



  const tableActions = [
    {
      id: 1,
      icon: <GrOverview />,
      method: viewUser,
    },
    {
      id: 2,
      icon: <MdDelete />,
      method: deleteuser,
    },
  ];

  return (
    <>
      <div className="container container-alt">
        <h3>User Management</h3>

      </div>
    <div className="container container-alt  ">
  

      <div className="d-flex justify-content-end  ">
      <div className="d-flex align-items-center mx-5">
      <input className="form-control me-2" value={search} onChange={(e)=>setSearch(e.target.value)}  type="search" placeholder="Email, firstname . . ." aria-label="Search" />
      <button className="btn btn-outline-success"  onClick={()=>dispatch(filterUserList(search))} >Search</button>
    </div>
        <button type="button" className="btn  btn-success  " onClick={()=>navigate('/addUser')} >Add User</button>
      </div>
     
    </div>
    <div className="container bg-white">
      <Table   hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.address}</td>
                <td>
                <div  className="d-flex justify-content-around ">
                  {tableActions.map((action) => {
                    return (
   
                          <span key={action.id} className={action.id === tableActions.length ? 'text-danger':'' } onClick={()=>action.method(user._id)}>{action.icon}</span>
                          );
                        })}
                        </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      </div>
   
    </>
  );
};

export default Users;
