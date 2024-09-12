import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { S3Client} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { authmiddleware } from "../middlewares";
import { createTaskInput } from "../types";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;
const prismaClient = new PrismaClient();

// AWS S3 Client setup
const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS!,
  },
  region: "us-east-1",
});

// Generate presigned URL for image upload
router.get("/presignedUrl", authmiddleware, async (req, res) => {
    // @ts-ignore
  const userId = req.userId; // Get user ID from the authentication middleware

  const { url, fields } = await createPresignedPost(client, {
    Bucket: "ctrypto",
    Key: `/images/${userId}/${Math.random()}/image.jpg`,
    Conditions: [["content-length-range", 0, 5 * 1024 * 1024]], // Limit size to 5MB
    Fields: { "Content-Type": "image/png" },
    Expires: 3600,
  });

  res.json({ presignedUrl: url, fields });
});

// User sign-in + sign-up route
router.post("/signin", async (req, res) => {
  const hardCodedWalletAddress = "2a9F6nrHgc4tqo12NGv9SGR9sx5VsCP4k8mQyy4QAVJr"; // Hardcoded wallet for now

  let user = await prismaClient.user.findFirst({
    where: { address: hardCodedWalletAddress },
  });

  if (user) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET); // Generate JWT if user exists
    res.json({ token });
  } else {
    user = await prismaClient.user.create({
      data: { address: hardCodedWalletAddress },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET); // Create user and generate JWT
    res.json({ token });
  }
});

// Task creation route
router.post("/task", authmiddleware, async (req, res) => {
  const body = req.body;
  const parseData = createTaskInput.safeParse(body); // Validate task creation input
//   @ts-ignore
  const userId = req.userId; // Get user ID from the auth middleware

  if (!parseData.success) {
    return res.status(400).json({ message: "You sent the wrong input" });
  }

  let response = await prismaClient.$transaction(async (tx) => {
    const response = await tx.task.create({
      data: {
        title: parseData.data.title ?? "Select the most clickable thumbnail",
        signature: parseData.data.signature,
        amount: "1",
        user: { connect: { id: userId } }, // Associate task with the user
      },
    });

    await tx.option.createMany({
      data: parseData.data.options.map((option) => ({
        image_url: option.imageUrl,
        task_id: response.id,
      })),
    });

    return response;
  });

  res.json({ id: response.id, message: "Task created successfully" });
});

// Task retrieval route
router.get("/task", authmiddleware, async (req, res) => {
    // @ts-ignore
    const taskId = req.query.taskId; 
    // @ts-ignore
    const userId = req.userId; 

    const taskDetails = await prismaClient.task.findFirst({
        where: { user_id: Number(userId), id: Number(taskId) },
        include: { options: true },
    });

    if(!taskDetails){
        return res.status(404).json({ message: "Task not found" });
    }

    const responses = await prismaClient.submission.findMany({
        where: { task_id: Number(taskId) },
        include: { option: true },

    });

    const result: Record<string,{
        count: number;
        option: {
            imageUrl: string
        }
    }> = {};

    taskDetails.options.forEach((option) => {
        result[option.id] = {
          count: 0,
          option: {
            imageUrl: option.image_url,
          },
        };
    })

    responses.forEach((response) => {
        
            result[response.option_id].count++;
        
    });

    res.json({ result });

})

export default router;
