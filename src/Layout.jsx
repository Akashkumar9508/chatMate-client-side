import React, { useEffect } from 'react'
import {Nav , Footer} from "./components/allComponents"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSocket } from './context/socketContext.jsx'

function Layout() {

  const {status,userData}=useSelector(state=>state.auth);
  const socket=useSocket();
  
  useEffect(() =>{
    console.log(socket);
    if(status && socket){
      console.log(socket);
      socket.emit('userName',userData.userName);
      socket.on('onlineUsers',(a)=>console.log(a))
    }
  },[status,userData]);
  
  return (
    <>
      <Nav/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default Layout