'use client'

import {useRouter} from 'next/navigation'
import React, { useRef, useState } from 'react'
import { PixelType } from '../types/pixelType'
import { useToolsContext } from '../providers/ToolsProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const Pixel = (props:{
    pixel:PixelType
}) => {

    const { pixel } = props

    const { pickedColor, currentTool } = useToolsContext()

    const router = useRouter()

    const [isHovered, setIsHovered] = useState(false)

    const pixelRef = useRef<HTMLDivElement>(null!)

    const queryClient = useQueryClient()

    const editPixel = useMutation(
      async (color:string) => {
        const editPromise =  axios.post(
            "/api/pixels/editPixel",
            {
              color:color,
              pixelId:pixel.id
            }
        )
        toast.promise(
          editPromise,
          {
            loading:'editing pixel...',
            error:(err)=>{
              return err.response.data.message
            },
            success:(data)=>{
              queryClient.invalidateQueries(["allPixels"])
              return "Pixel has been edited !"
            }
          }
        )
      }
    )

    const eraseEdit = useMutation(
      async () => {
        const deletePromise =  axios.post(
          "/api/pixels/erasePixelEdit",
          {
            pixelId:pixel.id
          }
        )
        toast.promise(
          deletePromise,
          {
            loading:'editing pixel...',
            error:(err)=>{
              return err.response.data.message
            },
            success:(data)=>{
              queryClient.invalidateQueries(["allPixels"])
              return "Last edit has been deleted"
            }
          }
        )
      }
    )


  return (
    <div
        className={`pixel ${isHovered ? 'pixelHovered' : ''} ${currentTool === 'rubber' ? 'rubberActive' : ''} ${currentTool === 'history' ? 'historyActive' : ''}`}
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        style={{
            borderLeft: pixel.column === 1 ? '1px solid rgba(0, 0, 0, 0.6)' : '',
            borderTop:pixel.row === 1 ? '1px solid rgba(0, 0, 0, 0.6)' : '',
            backgroundColor: currentTool === 'pencil' ? isHovered ? pickedColor : pixel.edits.length ? pixel.edits[pixel.edits.length-1].color : pixel.currentColor : pixel.edits.length ? pixel.edits[pixel.edits.length-1].color : pixel.currentColor,
            gridArea:`${pixel.row} / ${pixel.column} / ${pixel.row+1} / ${pixel.column+1}`
        }}
        ref={pixelRef}
        onClick={()=>{
          if(currentTool === 'pencil'){
            editPixel.mutate(pickedColor)
          }
          if(currentTool === 'history'){
            router.push(`/pixelHistory/${pixel.id}`)
          }
          if(currentTool === 'rubber'){
            eraseEdit.mutate()
          }
        }}
    >
      {
        isHovered && currentTool === 'cursor' && 
        <div 
          className='pixelInfos'
          style={{
            position:'absolute',
            left:pixelRef.current.offsetLeft+25,
            top:pixelRef.current.offsetTop
          }}
        >
          <span>ID: {pixel.id}</span>
          <span>Row: {pixel.row}</span>
          <span>Column: {pixel.column}</span>
          <span>Color: {pixel.currentColor}</span>
          <span>Last Edit: {pixel.edits[0]?.userId}</span>
        </div>
      }
    </div>
  )
}

export default Pixel