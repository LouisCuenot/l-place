'use client'

import { PixelType } from "@/app/types/pixelType"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import './css/pixelHistory.scss'


type URL = {
    params:{
        slug:string
    }
}

const getPixelByID = async (slug:string) => {
    const response = await axios.get(`/api/pixels/${slug}`)
    return response.data
}

export default function PixelHistory(url:URL){

    const {data,isLoading} = useQuery<PixelType>({
        queryFn:()=>getPixelByID(url.params.slug),
        queryKey:["pixel-history"]
    })

    if(isLoading){
        return "Loading"
    }


    return(
        <div className="pixelHistory">
            {
                data?.edits.map(edit=>(
                    <div className="edit" key={edit.id}>
                        <span>Pixel ID : {edit.pixelId}</span>
                        <span>Color : {edit.color}</span>
                    </div>
                ))
            }
            {
                !data?.edits[0] && <span>This pixel don't have any edit</span>
            }
        </div>
    )

}