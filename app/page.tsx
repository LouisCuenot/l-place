'use client'

import Grid from "./components/Grid";
import Sidebar from "./components/Sidebar";
import { ToolsContext } from "./providers/ToolsProvider";
import { useState } from "react";


export default function Home() {

  const [currentTool, setCurrentTool] = useState<string>('cursor')
  const [pickedColor, setPickedColor] = useState<string>('#FF0000')
  return (
    <main>
      <ToolsContext.Provider value={{currentTool,setCurrentTool,pickedColor,setPickedColor}}>
        <Grid/>
        <Sidebar/>
      </ToolsContext.Provider>
    </main>
  )
}
