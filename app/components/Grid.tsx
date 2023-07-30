'use client'

import React, { useEffect, useState } from 'react'
import './css/Grid.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PixelType } from '../types/pixelType'
import Pixel from './Pixel'


const getAllPixels = async () => {
  const response = await axios.get("/api/pixels/getAllPixels")
  return response.data
}

const Grid = () => {

  const [squareSize, setSquareSize] = useState(window.innerWidth>window.innerHeight-80 ? (window.innerHeight - 80) * 0.9 : (window.innerWidth - 80) * 0.9  )

  useEffect(()=>{


    const resizeSquare = () => {
      setSquareSize(window.innerWidth>window.innerHeight-80 ? (window.innerHeight - 80) * 0.9 : (window.innerWidth - 80) * 0.9)
    }

    window.addEventListener('resize',()=>resizeSquare())

    return(
      window.removeEventListener('resize',()=>resizeSquare())
    )

  },[])

  const {data,error,isLoading} = useQuery<PixelType[]>({
    queryFn:getAllPixels,
    queryKey:["allPixels"]
  })

  if(error){
    return <div>Error whie loading pixels</div>
  }

  if(isLoading){
    return <div>Loading pixels...</div>
  }

  console.log(data)

  

  


  return (
    <div 
      id='pixelGrid'
      style={{
        width:squareSize,
        height:squareSize
      }}
    >
      {
        data?.map(pixel=>(
          <Pixel key={pixel.id} pixel={pixel} />
        ))
      }
    </div>
  )
}

export default Grid