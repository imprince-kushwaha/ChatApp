import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
    _id: "",
    name: "",
    email: "",
    // picture: "",
    profile_pic: "",
    token: "",
    // to show the user is online or not
    onlineUser:[],
    // socket 
    socketConnection:null
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUser:(state,action)=>{
            state._id=action.payload._id
            state.name=action.payload.name
            state.email=action.payload.email
            state.profile_pic=action.payload.profile_pic
            // state.picture=action.payload.picture
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        logout:(state,action)=>{
            state._id=""
            state.name=""
            state.email=""
            // state.picture=""
            state.profile_pic=""
            state.token=""
            state.socketConnection=null
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser=action.payload
        },
        setSocketConnection:(state,action)=>{
            state.socketConnection=action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser,setToken,logout,setOnlineUser,setSocketConnection} = userSlice.actions

export default userSlice.reducer