'use client'

import React from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios, { AxiosError } from "axios"

const createPixel = async (id:number) => {
    return axios.post('/api/pixels/createPixels', { id: id });
  };

const ResetPixels = () => {

    

    const { mutate } = useMutation({
        mutationFn: async () => {
            const resetPromise = axios.post(
                '/api/pixels/createPixels'
            )
        },
        onSuccess:(e:any)=>{
            console.log(e)
        }

    })

    const submitReset = async (e:React.MouseEvent) => {
        e.preventDefault()
        mutate()
        
    }

  return (
    <div>
        <button onClick={(e)=>submitReset(e)}>Reset Pixels</button>
    </div>
  )
}

export default ResetPixels