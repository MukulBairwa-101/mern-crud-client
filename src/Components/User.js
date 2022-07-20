import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {updateUser} from "../Redux/Actions";
import {useParams,useNavigate} from  "react-router-dom";
const User = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,setValue
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  userId  = useParams();
  // console.log(userId.id);

  const userState = useSelector((state) => state.usersReducer);

  let formValues = getValues();
  // console.log(formValues); 

useEffect(()=>{
  setValue("firstname",userState.user.firstname);
  setValue("lastname",userState.user.lastname);
  setValue("email",userState.user.email);
  setValue("address",userState.user.address);
  setValue("age",userState.user.age);
 
},[userState])

  const [toggle,setToggle]= useState(false);
// console.log(toggle);



 const handleFormData =(data)=>{
  console.log(data);
  let payloadObject ={
    payloadData:data,
    user_Id:userId,
  }
if(toggle){
  dispatch(updateUser(payloadObject));
    navigate('/');

}



}






  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onClick={()=>{
            setToggle(!toggle);
            // console.log(userState.mode.isViewMode)
          }}
        />
      </div>
      <div className="container  ">
        <form className="row" onSubmit={handleSubmit(handleFormData)}>
          <div className=" mb-2 d-flex flex-column col ">
            <label>Firstname</label>
            <input
              className="mb-2  mt-3 "
              // value={userState.user.firstname}
              {...register("firstname", { required: true, minLength: 3 })}
              readOnly ={!toggle? true:false}
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
              readOnly ={!toggle? true:false}
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
          <div className="w-100"></div>

          <div className="  mb-2 d-flex flex-column col">
            <label>Email</label>
            <input
              readOnly ={!toggle? true:false}
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
          <div className=" d-flex flex-column col">
            <label>Address</label>
            <input
              readOnly ={!toggle? true:false}
              className="mb-2  mt-3"
              {...register("address", { required: true })}
            />
            <span>
              {errors.address?.type === "required" && "Address is required"}
            </span>
          </div>
          <div className="w-100"></div>

          <div className=" mb-2 d-flex flex-column col">
            <label>Password</label>
            <input
              type="password"
              className="mb-2  mt-3"
              disabled ={!toggle? true:false}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 10,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              })}
            />
            {toggle?
             <span>
             {errors.password?.type === "required" && "Password is required"}
             {errors.password?.type === "pattern" && "Password  is invalid"}
             {errors.password?.type === "minLength" &&
               "Password must be of 6 characters"}
             {errors.password?.type === "maxLength" &&
               "Password  should not greater than 10 characters"}
           </span>:null
          }
           
          </div>

          <div className=" mb-2 d-flex flex-column col">
            <label>Age</label>
            <input
              type="number"
              className="mb-2 mt-3"
              readOnly ={!toggle? true:false}
              {...register("age", { required: true, valueAsNumber: true })}
            />
            <span>{errors.age?.type === "required" && "Age is required"}</span>
          </div>
          <div class="w-100"></div>

          <div className="d-flex ">
            <button
              type="submit"
              className={` btn  pointer mt-3  ${
                !toggle ? "btn-secondary" : "btn-success"
              } `}
            >
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default User;
