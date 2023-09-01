import type { NextApiRequest, NextApiResponse } from "next";

const BASE_API = process.env.BASE_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  try {
    switch (requestMethod) {
      case "GET":
        const {page} = req.query;
        const http = await fetch(BASE_API + "/patient/data?page=" + page);
        const httpResponse = await http.json();

        return res.status(200).json(httpResponse);
      case "POST":
        const {medical_record} = JSON.parse(req.body);
        const requestPost = await fetch(BASE_API + "/patient/" + medical_record);
        const responsePost = await requestPost.json();

        return res.status(200).json(responsePost);
      default:
        return res.status(200).json({message: 'Welcome to API Routes!'});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}