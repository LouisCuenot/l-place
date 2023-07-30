import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "POST"){


        


        try{
            const deletedPixels = await prisma.pixel.deleteMany();
            console.log(`Suppression réussie de ${deletedPixels.count} pixels existants.`);
        }catch(err){
            console.error('Une erreur s\'est produite lors de la suppression des pixels existants :', err);
        }
        
      
       

        try {
            const pixelsData = [];
        
            // Créer les données pour les 2500 pixels avec la couleur '#FFFFFF'
            for (let i = 1; i <= 50; i++) {
              for (let j = 1; j <= 50; j++) {
                pixelsData.push({
                  row: i,
                  column: j,
                  currentColor: '#FFFFFF',
                });
              }
            }
        
            // Utiliser la méthode createMany pour insérer les données en une seule requête
            const createdPixels = await prisma.pixel.createMany({
              data: pixelsData,
              skipDuplicates: true, // Facultatif : ignorer les doublons si besoin
            });
        
            console.log(`Création réussie de ${createdPixels.count} pixels !`);
          } catch (error) {
            console.error('Une erreur s\'est produite lors de la création des pixels :', error);
          }

        

        //const prismaUser = await prisma.user.findUnique({
        //    where:{email:session.user?.email!}
        //})
//
        //
//
        //try{
        //    const result = await prisma.pixel.create({
        //        data:{
        //            id:pixelId,
        //            currentColor:'#FFFFFF'
        //        }
        //    })
        //    res.status(200).json(result)
        //}catch(error){
        //    res.status(403).json({message:"An error occured while creating a post"})
        //}
    }
}