import React from 'react'
import SignUp from '../components/SignUp'
import LoginComponent from '../components/LoginComponent'


function LoginPage() {
  return (
   <div className='h-screen pt-0 md:p-5 sm:p-0 justify-evenly items-center md:flex'>
   <SignUp/>
   <LoginComponent />

</div>
  )
}

export default LoginPage