"use client"
import {signIn} from 'next-auth/react'
import './css/SignIn.scss'

const SignIn = () => {
  return (
    <div className='SignIn' onClick={()=>signIn()}>Sign in</div>
  )
}

export default SignIn