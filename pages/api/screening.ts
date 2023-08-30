import type { NextApiRequest, NextApiResponse } from "next";

const BASE_API = process.env.BASE_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  try {
    switch (requestMethod) {
      case "GET":
        const {page} = req.query;
        const requestGet = await fetch(BASE_API + "/screening/?page=" + page);
        const httpResponse = await requestGet.json();

        return res.status(200).json(httpResponse);
      case "POST":
        const {screening_id} = JSON.parse(req.body);
        const requestPost = await fetch(BASE_API + "/screening/" + screening_id);

        if ([200, 201].includes(requestPost.status)) {
          return res.status(200).json(await requestPost.json());
        }
        return res.status(400).json({message: "no data"});
      default:
        return res.status(200).json({message: "Hello World"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}