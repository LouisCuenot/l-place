import { createContext, useContext } from "react";

export type ToolsContextTypes = {
    currentTool:string,
    setCurrentTool:(tool:string) => void,
    pickedColor:string,
    setPickedColor:(color:string)=>void
}

export const ToolsContext = createContext<ToolsContextTypes>({
    currentTool:'cursor',
    setCurrentTool:()=>{},
    pickedColor:'#FF0000',
    setPickedColor:()=>{}
})

export const useToolsContext = () => useContext(ToolsContext)