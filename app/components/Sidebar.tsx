'use client'

import React, { useEffect, useState } from 'react'
import './css/Sidebar.scss'
import ResetPixels from './sidebarComponents/ResetPixels'
import ToolButton from './sidebarComponents/ToolButton'
import ColorButton from './sidebarComponents/ColorButton'

const Sidebar = () => {

  const [squareSize, setSquareSize] = useState( window.innerWidth>window.innerHeight-80 ? (window.innerHeight - 80) * 0.9 : (window.innerWidth - 80) * 0.9  )

  useEffect(()=>{


    const resizeSquare = () => {
      setSquareSize(window.innerWidth>window.innerHeight-80 ? (window.innerHeight - 80) * 0.9 : (window.innerWidth - 80) * 0.9)
    }

    window.addEventListener('resize',()=>resizeSquare())

    return(
      window.removeEventListener('resize',()=>resizeSquare())
    )

  },[])

  return (
    <div 
      id='sidebar'
      style={{
        height:squareSize
      }}
    >
      <div className="sidebarContent">
        <ToolButton tool='cursor'/>
        <ToolButton tool='pencil'/>
        <ToolButton tool='rubber'/>
        <ColorButton color='#FF0000'/>
        <ColorButton color='#00FF00'/>
        <ColorButton color='#0000FF'/>
        <ColorButton color='#FF00FF'/>
        <ColorButton color='#FFFF00'/>
        <ColorButton color='#00FFFF'/>
        <ColorButton color='#FFFFFF'/>
        <ColorButton color='#000000'/>
      </div>
      <ResetPixels/>
    </div>
  )
}

export default Sidebar