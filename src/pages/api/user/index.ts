import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import {bcryptHasher} from "@/libs/bcryptHasher"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}



// POST /api/user
async function handlePOST(res: NextApiResponse, req:NextApiRequest) {
  
  const user = await prisma.user.create({
    data: { ...req.body, password: bcryptHasher.hash(req.body.password) },
  });
  res.json(user);
}