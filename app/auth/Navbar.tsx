import React from 'react'
import { getServerSession } from 'next-auth'
import './css/Navbar.scss'
import Link from 'next/link'
import SignIn from './SignIn'
import Logout from './Logout'
import {authOptions} from '../../pages/api/auth/[...nextauth]'

export default async function Navbar(){

    const session = await getServerSession(authOptions)

    console.log(session)

  return (
    <nav className='Navbar'>
        <Link href={'/'}>
            <h1>L/Place</h1>
        </Link>
        <div className="navbarLinks">
            {
                !session?.user && <SignIn/>
            }
            {
                session?.user &&  <Logout image={session.user.image!} />
            }
            
        </div>
    </nav>
  )
}
