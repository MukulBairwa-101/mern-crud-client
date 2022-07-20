export const addUser = (data)=>{
    return{
        type: 'ADD_USER',
        payload: data,
    }
}
export const updateUser = (data)=>{
    // console.log(data);
    return{
        type: 'UPDATE_USER',
        payload: data,
    }
}

export const deleteUser = (data)=>{
    return{
        type: 'DELETE_USER',
        payload: data,
    }
}

export const getUsers = (data)=>{
    return {
        type:'GET_USERS',
        payload:data
    }
}

export const getUser = (data)=>{
    return{
        type:'GET_USER',
        payload:data
    }
}

export const filterUserList =(filterProperty)=>{
    return {
        type:'FILTER_USERS',
        payload:filterProperty
    }
}
