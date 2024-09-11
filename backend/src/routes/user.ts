import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!

const prismaClient = new PrismaClient();

router.post("/signin", async (req, res) => {
    // TODO: ADD SIGN VERIFICATION LOGIC HERE
    const hardCodedWalletAddress = "2a9F6nrHgc4tqo12NGv9SGR9sx5VsCP4k8mQyy4QAVJr";

    let user = await prismaClient.user.findFirst({
        where : {
            address: hardCodedWalletAddress
        }
    })

    if(user){
        const token = jwt.sign({
            userId: user.id
        },JWT_SECRET);

        res.json({
            token
        })

    } else{
        user = await prismaClient.user.create({
            data : {
                address: hardCodedWalletAddress
            }
        })

        const token = jwt.sign(
          {
            userId: user.id,
          },
          JWT_SECRET
        );

        res.json({
          token,
        });
    }
});

export default router;
