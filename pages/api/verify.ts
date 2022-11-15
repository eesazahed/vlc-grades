import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const CANVAS_TOKEN = req.body;

    const response = await fetch(
      "https://canvas.instructure.com/api/v1/courses",
      {
        headers: { Authorization: `Bearer ${CANVAS_TOKEN}` },
      }
    );

    if (response.ok) {
      return res.status(200).json({
        message: "Successfully verified Canvas token.",
        type: "success",
      });
    } else {
      return res.status(200).json({
        message: "Invalid access token.",
        type: "error",
      });
    }
  } else {
    return res.status(405).json({
      message: "Sorry, that method isn't allowed.",
      type: "error",
    });
  }
}
