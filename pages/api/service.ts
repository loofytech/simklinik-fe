import type { NextApiRequest, NextApiResponse } from "next";

const BASE_API = process.env.BASE_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  try {
    switch (requestMethod) {
      case "GET":
        const {page} = req.query;
        const requestGet = await fetch(BASE_API + "/select/service/?page=" + page);
        const httpResponse = await requestGet.json();

        return res.status(200).json(httpResponse);
      case "POST":
        const {service_name, service_slug} = JSON.parse(req.body);
        const requestPost = await fetch(BASE_API + "/service", {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_name: service_name,
            service_slug: service_slug
          })
        });

        if ([200, 201].includes(requestPost.status)) {
          return res.status(200).json({message: "Submit OK!"});
        }
        return res.status(400).json({message: "Submit FAILED!"});
      case "PUT":
        const {service_id} = JSON.parse(req.body);
        const requestPut = await fetch(BASE_API + "/select/doctor/" + service_id);
        const responsePut = await requestPut.json();

        return res.status(200).json(responsePut);
      default:
        return res.status(200).json({message: "Hello World"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}