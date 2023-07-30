import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "POST"){
        const session = await getServerSession(req, res, authOptions)
        if(!session){
            return res.status(401).json({message:"Please Sign in to erase a pixel"})
        }
        
        const pixelId:number = req.body.pixelId 
        

        const concernedPixel = await prisma.pixel.findUnique({
            where:{
                id:pixelId
            },
            include:{
                edits:true
            }
        })

        

        try{

            if(concernedPixel?.edits.length){
                const result = await prisma.editPixel.delete({
                    where:{
                        id:concernedPixel?.edits[concernedPixel?.edits.length-1].id
                    }
                })
    
                res.status(200).json(result)
            }
            
        }catch(error){
            res.status(403).json({message:"An error occured while creating a pixel edit"})
        }

        try{

                const result = await prisma.pixel.update({
                    where:{
                        id:pixelId
                    },
                    data:{
                        currentColor:concernedPixel!.edits.length ? concernedPixel!.edits[concernedPixel!.edits.length-1].color : '#FFFFFF'
                    }
                })
                res.status(200).json(result)
            
        }catch(error){
            res.status(403).json({message:"An error occured while modifying a pixel"})
        }
    }
}