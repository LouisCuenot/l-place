'use client'

import { useToolsContext } from '@/app/providers/ToolsProvider'
import React from 'react'

const ColorButton = (props:{
    color:string
}) => {

    const {pickedColor, setPickedColor} = useToolsContext()


  return (
    <div 
        className='color'
        onClick={()=>{
            setPickedColor(props.color)
        }}
        style={{
            backgroundColor:props.color,
            border:pickedColor === props.color ? '3px solid #FFA500' : ''
        }}
    />
  )
}

export default ColorButton