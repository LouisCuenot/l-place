'use client'

import { useToolsContext } from '@/app/providers/ToolsProvider'
import React from 'react'

const ToolButton = (props:{
    tool:string
}) => {

    const {currentTool, setCurrentTool} = useToolsContext()


  return (
    <div 
        className='tool'
        onClick={()=>{
            setCurrentTool(props.tool)
        }}
        style={{
            backgroundColor:currentTool===props.tool ? 'rgba(0,0,255,0.3)' : ''
        }}
    >
        <span>{props.tool}</span>
    </div>
  )
}

export default ToolButton