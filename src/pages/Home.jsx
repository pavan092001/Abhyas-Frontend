import React, { useEffect, useState } from 'react'
import Tasks from '../components/Tasks'
import Calendar from '../components/Calendar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    console.log("user ",user);
    useEffect(()=>{
        // if(user==null){
        //     navigate("/login");
        // }
        const jwt = localStorage.getItem("jwt");
        console.log(jwt);
        // if(jwt==null || jwt==undefined){
        //     navigate("/login");
        // }

    },[])

  return (
     <div className='h-screen justify-center overflow-x-hidden  flex w-screen'>
    <div className='w-1/2  h-screen'>
      <Calendar/>
    </div>
    <div className='w-1/2 m-0'>
        <Tasks />
    </div>
    </div>

  )
}

export default Home