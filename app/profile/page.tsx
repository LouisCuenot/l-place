'use client'

import './css/profile.scss'

import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { EditType } from '../types/EditType'


const getUserEdits = async () => {
    const response = await axios.get("/api/user/getUserEdits")
    return response.data
}





const page = () => {

    const {data,error,isLoading} = useQuery<EditType[]>({
        queryFn:getUserEdits,
        queryKey:["userEdits"]
    })


    if(error){
      return <div>Error while loading edits</div>
    }

    if(isLoading){
      return <div>Loading edits...</div>
    }



  return (
    <div className='profile'>
        <h2>Your last edits :</h2>
        {
            data?.map(edit=>(
                <div className="edit" key={edit.id}>
                    <span>Pixel ID : {edit.pixelId}</span>
                    <span>Color : {edit.color}</span>
                </div>
            ))
        }
    </div>
  )
}

export default page