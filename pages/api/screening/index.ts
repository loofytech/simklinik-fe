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
        const requestPost = await fetch(BASE_API + "/screening", {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            screening_id: screening_id
          })
        });
        // console.log(await requestPost.json());

        if ([200, 201].includes(requestPost.status)) {
          return res.status(200).json(await requestPost.json());
        }
        return res.status(400).json({message: "no data"});
      case "PUT":
        const {
          registration_id, blood_type, body_weight, body_height,
          body_temperature, body_breath, body_pulse, body_blood_pressure_mm,
          body_blood_pressure_hg, body_imt, body_oxygen_saturation, body_diabetes,
          body_haemopilia, body_heart_desease, abdominal_circumference, history_other_desease,
          history_treatment, allergy_medicine, allergy_food
        } = JSON.parse(req.body);
        const requestPut = await fetch(BASE_API + "/screening", {
          method: "PUT",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            registration_id: registration_id, blood_type: blood_type, body_weight: body_weight,
            body_height: body_height, body_temperature: body_temperature, body_breath: body_breath,
            body_pulse: body_pulse, body_blood_pressure_mm: body_blood_pressure_mm, body_blood_pressure_hg: body_blood_pressure_hg,
            body_imt: body_imt, body_oxygen_saturation: body_oxygen_saturation, body_diabetes: body_diabetes,
            body_haemopilia: body_haemopilia, body_heart_desease: body_heart_desease, abdominal_circumference: abdominal_circumference,
            history_other_desease: history_other_desease, history_treatment: history_treatment, allergy_medicine: allergy_medicine,
            allergy_food: allergy_food
          })
        });
        // console.log(await requestPut.json());

        if ([200, 201].includes(requestPut.status)) {
          return res.status(200).json(await requestPut.json());
        }
        return res.status(400).json({message: "no data"});
      default:
        return res.status(200).json({message: "Hello World"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}