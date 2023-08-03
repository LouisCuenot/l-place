'use client'

import { useToolsContext } from '@/app/providers/ToolsProvider'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ToolButton = (props:{
    tool:string,
    imgSrc:StaticImageData
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
        <Image
            alt='a tool'
            src={props.imgSrc}
            width={25}
            height={25}
        />
    </div>
  )
}

export default ToolButton