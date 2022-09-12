import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await db
          .collection("notes")
          .find({})
          .sort({ custName: 1 })
          .toArray();
        res.status(200).json({
          success: true,
          count: notes.length,
          data: notes,
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({ error: "Server Error" });
      }
      break;
    case "POST":
      try {
        const note = await db.collection("notes").create(req.body);

        res.status(200).json({
          success: true,
          data: note,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
      }
      break;
    default:
      res.status(400).json({ error: "Unexpected Error" });
      break;
  }
}
