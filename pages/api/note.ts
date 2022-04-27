// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  message: string
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return await addNotes(req, res)
  }
  else if (req.method === "GET") {
    return await notesDatas(req, res)
  }
  else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }

}

async function addNotes(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  try {
    const newNote = await prisma.noteData.create({
      data: {
        title: body.title,
        content: body.content,
        meta: body.meta
      }
    })
    return res.status(200).json({ message: 'Note created', success: true, data: newNote })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error creating question", success: false });

  }
}
async function notesDatas(req: NextApiRequest,
  res: NextApiResponse) {
  try {
    const notes = await prisma.noteData.findMany();
    //@ts-ignore
    return res.status(200).json(notes, { success: true });
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Error reading", success: false });
  }
}

