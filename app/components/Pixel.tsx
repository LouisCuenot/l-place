'use client'

import React, { useRef, useState } from 'react'
import { PixelType } from '../types/pixelType'
import { useToolsContext } from '../providers/ToolsProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const Pixel = (props:{
    pixel:PixelType
}) => {

    const { pixel } = props

    const { pickedColor, currentTool } = useToolsContext()

    const [isHovered, setIsHovered] = useState(false)

    const pixelRef = useRef<HTMLDivElement>(null!)

    const queryClient = useQueryClient()

    const editPixel = useMutation(
      async (color:string) => {
        return axios.post(
            "/api/pixels/editPixel",
            {
              color:color,
              pixelId:pixel.id
            }
        )
      },
      {
        onSuccess:(data)=>{
          queryClient.invalidateQueries(["allPixels"])
        }
      }
    )

    const eraseEdit = useMutation(
      async () => {
        return axios.post(
          "/api/pixels/erasePixelEdit",
          {
            pixelId:pixel.id
          }
        )
      },
      {
        onSuccess:(data)=>{
          queryClient.invalidateQueries(["allPixels"])
        }
      }
    )


  return (
    <div
        className={`pixel ${isHovered ? 'pixelHovered' : ''} ${currentTool === 'rubber' ? 'rubberActive' : ''}`}
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