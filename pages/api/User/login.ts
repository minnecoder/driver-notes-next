import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  // Check if user exists
  const user = await db
    .collection("users")
    .find({ userName: req.body.userName })
    .toArray();
  if (user.length === 0) {
    return res.status(400).json({ error: "User name  is wrong" });
  }

  // Check if password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    user[0].password
  );
  if (!validPassword) {
    return res.status(400).json({ error: " password is wrong" });
  }

  // Create and assign token
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET as string
  );
  return res.json({ token });
}
