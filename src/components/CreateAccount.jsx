import React, { useState } from 'react'
import InputBox from './InputBox'
import { Button } from '@mui/material'
import Fab from '@mui/material/Fab';
import google from '../assets/google.png'
import { Link } from 'react-router-dom';
import gitHubB from '../assets/gitHubB.png'
import facebook from '../assets/facebook.png'
import { useDispatch,useSelector } from 'react-redux'
import { login, signup } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.user);
  const token = localStorage.getItem("jwt");
  if(user!=null){
    navigate('/');
  }
  if(token!==undefined && token!=null){
    navigate('/');
  }
    const [createUserReq,setCreateUserReq] = useState({
        email:"",
        name:"",
        password:"",
        role:"user"
    })
    const appUrl =import.meta.env.VITE_API_URL;
    const [errormsg,setErrorMsg]=useState({
      msg:"",
      status:false,
    })
    const onChangePassword=(e)=>{
        setCreateUserReq({...createUserReq,password:e.target.value});
      
    }
    const onChangeName=(e)=>{
        setCreateUserReq({...createUserReq,name:e.target.value});
        
    }
    const onChangeEmail=(e)=>{
        setCreateUserReq({...createUserReq,email:e.target.value});
       
    }
    const onsubmit=async()=>{
         try{
          setErrorMsg({msg:"",status:false});
          console.log(createUserReq);
          const res = await dispatch(signup(createUserReq)).unwrap();
          console.log("resss ",res)
          if(res){
              if(user!=null)
                navigate('/');
          }
         }catch(e){
          console.log("error ",e);
         }  
    }
      
   
     
  return (
    <div className='md:w-1/2 sm:w-screen sm:m-0'>
    <div className='w-full flex sm:justify-center flex-col items-center'>
        <div className='text-3xl font-bold '>
            Create Account 
        </div>
        <div className='max-w-md'>
        <div className='mt-10'>
            <InputBox wd="w-96" ws="w-80"  type="text" onChangeField={onChangeName} label="Enter Your Name" />
        </div>
        <div className='mt-10'>
            <InputBox wd="w-96"  ws="w-80" type="Email" onChangeField={onChangeEmail} label="Enter Your Email"/>
        </div>
        <div className='mt-10'>
            <InputBox wd="w-96"  ws="w-80" onChangeField={onChangePassword} type="password" label="Enter Your password"/>
        </div>
        </div>
           <div className='mt-6'>
           <Button variant="contained" onClick={onsubmit} size='medium' color="success">Create Account</Button>
           {errormsg.status && <p>errormsg.msg</p>}
           </div>
           <div className='mt-4 flex text-lg'>
              <p> Already have an Account ? </p><Link to="/login" className='text-blue-700 cursor-pointer font-bold'>&nbsp; Login</Link>
           </div>
        </div>
        <div className="flex flex-col items-center my-8">
            <div className="relative flex items-center w-full max-w-md">
            <div className="flex-grow border-t border-blue-300" />
            <span className="mx-4 text-black text-lg">Continue using</span>
            <div className="flex-grow border-t border-gray-300" />
      </div>

      <div className='flex mt-5'>
        <div className='mx-4'>
           <Link to={`${appUrl}/oauth2/authorization/google`}><Fab size='medium' 
             sx={{
                '&:hover': {
                  backgroundColor: '#E8F0FE',
                },
              }}>
                <img src={google} className='p-2' />
            </Fab>
            </Link>
        </div>
        <div className='mx-4'>
          <Link to={`${appUrl}/oauth2/authorization/github`} ><Fab size='medium' className='m-2'
             sx={{
                '&:hover': {
                  backgroundColor: '#E8F0FE',
                },
              }}>
                <img src={gitHubB} className='p-2' />
            </Fab>
            </Link>
        </div>
        <div className='mx-4'>
            <Fab size='medium' className='m-2'
             sx={{
                '&:hover': {
                  backgroundColor: '#E8F0FE',
                },
              }}>
                <img src={facebook} className='p-1' />
            </Fab>
        </div>
      </div>
    </div>
      


    </div>
  )
}

export default CreateAccount