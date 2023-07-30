import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from 'next-auth/next'
import prisma from '../../../prisma/client'
import {authOptions} from '../auth/[...nextauth]'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "GET"){
        const session = await getServerSession(req, res, authOptions)

        if(!session){
            return res.status(401).json({message:"Please Sign in to see your profile"})
        }

        const prismaUser = await prisma.user.findUnique({
            where:{email:session.user?.email!}
        })


        try{
            const result = await prisma.editPixel.findMany({
                where:{
                    userId:prismaUser?.id
                }
            })
            
            res.status(200).json(result)
        }catch(error){
            res.status(403).json({message:"An error occured while getting edits"})
            console.log(error)
        }
    }
}