import prisma from '../../../prisma/client'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      if(req.method === "GET"){
         
  
          try{
              console.log(req.query)
  
              const result = await prisma.pixel.findUnique({
                  where:{
                      id:Number(req.query.details)
                  },
                  include:{
                      edits:true
                  }
              })
              res.status(200).json(result)
          }catch(error){
              res.status(403).json({message:"An error occured while getting pixel by Id"})
          }
      }
  }