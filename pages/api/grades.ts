import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const CANVAS_TOKEN = req.body;

      const response = await fetch(
        "https://canvas.instructure.com/api/v1/courses?include[]=total_scores",
        {
          headers: { Authorization: `Bearer ${CANVAS_TOKEN}` },
        }
      );

      const user = await fetch(
        "https://canvas.instructure.com/api/v1/users/self",
        {
          headers: { Authorization: `Bearer ${CANVAS_TOKEN}` },
        }
      );

      const userInfo = await user.json();
      const username = userInfo.name.split(" ")[0] || userInfo.name;

      interface Grade {
        name: string;
        grade: number;
      }

      const data = await response.json();
      const grades: Grade[] = [];

      for (const course of data) {
        const grade = course.enrollments[0].computed_current_score;

        if (grade) {
          grades.push({ name: course.name, grade: grade });
        }
      }

      return res.status(200).json({
        message: "Successfully retrieved Canvas courses.",
        type: "success",
        grades,
        username,
      });
    } catch {
      return res.status(400).json({
        message: "Could not retrieve grades from Canvas.",
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
