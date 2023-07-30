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
            return res.status(401).json({message:"Please Sign in to edit a pixel"})
        }
        
      
        const color:string = req.body.color
        const pixelId:number = req.body.pixelId 
        

        const prismaUser = await prisma.user.findUnique({
            where:{email:session.user?.email!}
        })

        

        try{
            const result = await prisma.editPixel.create({
                data:{
                    color:color,
                    pixelId:pixelId,
                    userId:prismaUser!.id
                }
            })
        }catch(error){
            res.status(403).json({message:"An error occured while creating a pixel edit"})
        }

        try{
            const result = await prisma.pixel.update({
                where:{id:pixelId},
                data:{
                    currentColor:color
                }
            })
            res.status(200).json(result)
        }catch(error){
            res.status(403).json({message:"An error occured while modifying a pixel"})
        }
    }
}