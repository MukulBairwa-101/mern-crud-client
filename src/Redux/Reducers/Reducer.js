import axios from "axios";

const initialState = {
  users: [],
  user: [],
  mode:{
      isEditMode:false,
      isViewMode:false,
  }
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
        const  data = action.payload; 
        axios({ method: "POST", url: "http://localhost:5000/users", data}).then(
            (res) => {
            // console.log(res.data, "response-data");

            }
        );

        return {
            ...state,
            
        };

    case "GET_USERS":
      state.users =  action.payload;
      return {...state};

    case "DELETE_USER":
        // console.log(action.payload);  
        const _id_Del = action.payload;

        axios({ method: "DELETE", url: `http://localhost:5000/users/${_id_Del}`,_id_Del })
        
    
        return {...state}
    
    case "GET_USER":
        // console.log(action.payload);
        state.user = action.payload.payloadData;
        if(action.payload.mode.isViewMode){
          state.mode = action.payload.mode;
        }

      
      return {...state}

    case "UPDATE_USER":
      const _id_Update = action.payload.user_Id.id;
      const updateData = action.payload.payloadData;
      // console.log(updateData)
      // console.log(action.payload);
      
      axios.patch(`http://localhost:5000/users/${_id_Update}`,updateData)

      // axios({ method: "PATCH", url: `http://localhost:5000/users/${_id_Update}`,updateData })

      return {...state}

    case "FILTER_USERS":
      const _filter_Key = action.payload;
      state.users = state.users.filter((user)=>{
        
        return(
          user.firstname === _filter_Key  ||  user.lastname === _filter_Key  || user.email.includes(_filter_Key) 
        )
      
      });
      // state.users = state.users.filter((user)=>user.firstname === _filter_Key || user.lastname === _filter_Key || user.email.includes(_filter_Key) || user.age === Number(_filter_Key) || user.address.imcludes(_filter_Key));
      return {...state};


    default:
      return {...state};
  }
};

export default usersReducer;
