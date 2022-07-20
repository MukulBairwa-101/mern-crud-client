import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Actions";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,getValues
  } = useForm();
  const [profileImage, setProfileImage] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.usersReducer?.user);
//   console.log(user);

  const handleFormData = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("profile", data.file[0]);
    console.log(formData);
    // setValue("profile", profileImage);
    dispatch(addUser(data));

    // navigate("/");

    // axios.post('http://localhost:5000/users',{headers: {'Content-Type': 'application/json'}, data})
    // .then((res)=>console.log(res.data,"response-data"));
  };

  const handleImage = (e) => {
    const fileRead = new FileReader();
    console.log("fileRead success");
    fileRead.onload = () => {
      console.log("fileRead load succes");
      if (fileRead.readyState === 2) setValue("profile",fileRead.result)
    };
    fileRead.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="container bg-white  ">
      <form onSubmit={handleSubmit(handleFormData)} className="row">
        <div className=" mb-2 d-flex flex-column col ">
          <label>Add Picture</label>
          <img src={profileImage} alt="profile" className="uploadimage" />
          <input
            className="mb-2  mt-3 "
            type="file"
            accept="image/*"
            name="image-upload"
            // value={getValues("profile")}
            // onChange={(e)=>handleImage(e)}
            {...register("profile")}
          />

          {/* <span>
                    {errors.firstname?.type === 'required' && "firstname is required"}
                    {errors.firstname?.type === 'minLength' && "firstname  must be of 3 characters"}
                </span> */}
        </div>
        <div className="w-100"></div>
        <div className=" mb-2 d-flex flex-column col ">
          <label>Firstname</label>
          <input
            className="mb-2  mt-3 "
            {...register("firstname", { required: true, minLength: 3 })}
          />
          <span>
            {errors.firstname?.type === "required" && "firstname is required"}
            {errors.firstname?.type === "minLength" &&
              "firstname  must be of 3 characters"}
          </span>
        </div>

        <div className=" mb-2 d-flex flex-column col">
          <label>Lastname</label>
          <input
            className="mb-2  mt-3"
            {...register("lastname", {
              required: true,
              maxLength: 20,
              minLength: 3,
            })}
          />
          <span>
            {errors.lastname?.type === "required" && "lastname is required"}
            {errors.lastname?.type === "minLength" &&
              "lastname  must be of 3 characters"}
          </span>
        </div>

        <div className="  mb-2 d-flex flex-column col">
          <label>Email</label>
          <input
            className="mb-2  mt-3"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          <span>
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "pattern" && "Email  is invalid"}
          </span>
        </div>
        <div className=" mb-2 d-flex flex-column col">
          <label>Age</label>
          <input
            type="number"
            className="mb-2 mt-3"
            {...register("age", { required: true, valueAsNumber: true })}
          />
          <span>{errors.age?.type === "required" && "Age is required"}</span>
        </div>

        <div className="w-100"></div>

        <div className=" mb-2 d-flex flex-column col">
          <label>Password</label>
          <input
            type="password"
            className="mb-2  mt-3"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 10,
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
          />
          <span>
            {errors.password?.type === "required" && "Password is required"}
            {errors.password?.type === "pattern" && "Password  is invalid"}
            {errors.password?.type === "minLength" &&
              "Password must be of 6 characters"}
            {errors.password?.type === "maxLength" &&
              "Password  should not greater than 10 characters"}
          </span>
        </div>

        <div className=" d-flex flex-column col">
          <label>Address</label>
          <input
            className="mb-2  mt-3"
            {...register("address", { required: true })}
          />
          <span>
            {errors.address?.type === "required" && "Address is required"}
          </span>
        </div>

        <div class="w-100"></div>

        <div className="d-flex ">
          <button type="submit" className="btn btn-primary pointer mt-3 ">
            Add User{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
