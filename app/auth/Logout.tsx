'use client'

import React from 'react'
import './css/Logout.scss'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const Logout = (props:{
    image:string
}) => {
  return (
    <div className="Logout">
        <div className="logoutButton" onClick={()=>signOut()}>
            Log out
        </div>
        <Link href={'/profile'}>
            <Image
                alt='profile'
                src={props.image}
                width={32}
                height={32}
                priority
            />
        </Link>
    </div>
  )
}

export default Logout