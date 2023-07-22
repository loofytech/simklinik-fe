import type { NextApiRequest, NextApiResponse } from "next";

const BASE_API = process.env.BASE_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  try {
    switch (requestMethod) {
      case "GET":
        const {page} = req.query;
        const http = await fetch(BASE_API + "/doctor_schedule/data?page=" + page);
        const httpResponse = await http.json();

        return res.status(200).json(httpResponse);
      case "POST":
        if (req.body.trim().length === 0) return res.status(401).json({message: 'body empty'});
        return res.status(200).json({message: "POST"})
      default:
        return res.status(200).json({message: 'Welcome to API Routes!'});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}