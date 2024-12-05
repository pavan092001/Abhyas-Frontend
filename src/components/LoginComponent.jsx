import React,{useState} from 'react'
import google from '../assets/google.png'
import gitHubB from '../assets/gitHubB.png'
import facebook from '../assets/facebook.png'
import InputBox from './InputBox'
import { Button } from '@mui/material'
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../redux/slices/authSlice'

function LoginComponent() {
  

  const navigate= useNavigate();
  const dispatch =useDispatch();
  const token = localStorage.getItem("jwt");
  const user = useSelector(state=>state.auth.user);
  if(token!=undefined || user!=null ||token!=null){
      console.log("testing data",user);
      navigate('/');
  }
  
  const appUrl =import.meta.env.VITE_API_URL;
    const [createLoginReq,setLoginReq] = useState({
        email:"",
        password:""
    })
    const onChangePassword=(e)=>{
        setLoginReq({...createLoginReq,password:e.target.value});
      
    }
    const onChangeEmail=(e)=>{
        setLoginReq({...createLoginReq,email:e.target.value});
       
    }
    const onsubmit=async()=>{
        console.log(createLoginReq);
        const res = await dispatch(login(createLoginReq));
        console.log(res);
        const user = useSelector((state)=>state.auth.user);
        if(user){
          navigate("/");
        }
    }
 
  return (
    <div className='md:w-1/2 sm:w-screen  p-5 py-10 rounded-xl sm:m-0'>
    <div className='w-full  flex sm:justify-center flex-col items-center'>
        <div className='text-3xl font-bold '>
            Login  
        </div>
        <div className='max-w-md'>
        <div className='mt-12'>
            <InputBox wd="w-96"  ws="w-80" type="Email" onChangeField={onChangeEmail} label="Enter Your Email"/>
        </div>
        <div className='mt-12'>
            <InputBox wd="w-96"  ws="w-80" onChangeField={onChangePassword} type="password" label="Enter Your password"/>
        </div>
        </div>
           <div className='mt-8'>
           <Button variant="contained" onClick={onsubmit} size='medium'  color="primary"> Login </Button>
           </div>
           <div className='mt-12 flex text-lg'>
              <p> Don't have an Account ? </p>
              {/* <Link to="/signup" className='text-blue-700 cursor-pointer font-bold'>&nbsp; Sign up</Link> */}
           </div>
        </div>
        <div className="flex flex-col items-center mt-5">
            <div className="relative flex items-center w-full max-w-md">
            <div className="flex-grow border-t border-blue-300" />
            <span className="mx-4 text-black text-lg">Continue using</span>
            <div className="flex-grow border-t border-gray-300" />
      </div>

      <div className='flex mt-5'>
        <div className='mx-4'>
            <Fab size='medium' 
             sx={{
                '&:hover': {
                  backgroundColor: '#E8F0FE',
                },
              }}>
                <img src={google} className='p-2' />
            </Fab>
        </div>
        <div className='mx-4'>
          {/* <Link to={`${appUrl}/oauth2/authorization/github`}> */}
            <Fab size='medium' className='m-2'
             sx={{
                '&:hover': {
                  backgroundColor: '#E8F0FE',
                },
              }}>
                <img src={gitHubB} className='p-2' />
            </Fab>
            
        </div>
        <div className='mx-4'>
           {/* <Link to={`${appUrl}/oauth2/authorization/google`}> */}
           <Fab size='medium' className='m-2'
             sx={{
                '&:hover': {
                  backgroundColor: '#E8F0FE',
                },
              }}>
                <img src={facebook} className='p-1' />
            </Fab>
            {/* </Link> */}
        </div>
      </div>
    </div>
      


    </div>
  )
}

export default LoginComponent