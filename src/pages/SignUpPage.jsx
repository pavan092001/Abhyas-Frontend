import React from 'react'
import SignUp from '../components/SignUp'
import CreateAccount from '../components/CreateAccount'

function SignUpPage() {
  return (
    <div className='h-screen  pt-0 md:p-5 sm:p-0 justify-evenly items-center md:flex'>
      
        <SignUp/>
        <CreateAccount  />

    </div>
  )
}

export default SignUpPage