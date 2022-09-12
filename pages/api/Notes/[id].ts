import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "PUT":
      try {
        const note = await db.collection("notes").findById(id).exec();
        note?.set(req.body);
        await note?.save();
        res.status(200).json({
          success: true,
          data: note,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
      }
      break;

    case "DELETE":
      try {
        const note = await db.collection("notes").findById(id);

        if (!note) {
          res.status(404).json({
            success: false,
            error: "No note found",
          });
        }
        await note?.remove();

        res.status(200).json({
          success: true,
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
