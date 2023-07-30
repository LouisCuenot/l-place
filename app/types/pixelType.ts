import { EditType } from "./EditType"

export type PixelType = {
    id:number,
    row:number      
    column:number   
    createdAt:string  
    updatedAt?:string 
    currentColor:string
    edits:EditType[]
}