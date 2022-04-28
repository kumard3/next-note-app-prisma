import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const postId = req.query.id;

    if (req.method === "DELETE") {
        const post = await prisma.noteData.delete({
            where: {
                id: Number(postId)
            }
        });

        res.json(post);
    } else {
        throw new Error(
            `The HTTP method ${req.method} is not supported on this route`
        );
    }
};

export default handle;