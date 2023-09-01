import type { NextApiRequest, NextApiResponse } from "next";

const BASE_API = process.env.BASE_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  try {
    switch (requestMethod) {
      case "GET":
        const {page} = req.query;
        const requestGet = await fetch(BASE_API + "/registration/?page=" + page);
        const httpResponse = await requestGet.json();

        return res.status(200).json(httpResponse);
      case "POST":
        const {
          medical_record,
          patient_name,
          patient_address,
          patient_phone,
          patient_nik,
          birth_place,
          birth_date,
          province,
          regency,
          district,
          sub_district,
          patient_gender,
          // patient_blood_type,
          job_id,
          ethnic_id,
          religion_id,
          education_id,
          marital_status,
          responsible_name,
          responsible_phone,
          responsible_address,
          responsible_relation,
          service_id,
          // unit_id,
          user_id,
          payment_id
        } = JSON.parse(req.body);
        const requestPost = await fetch(BASE_API + "/registration", {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            medical_record: medical_record,
            patient_name: patient_name,
            patient_address: patient_address,
            patient_phone: patient_phone,
            patient_nik: patient_nik,
            birth_place: birth_place,
            birth_date: birth_date,
            patient_gender: patient_gender,
            // patient_blood_type: patient_blood_type,
            province: province,
            regency: regency,
            district: district,
            subdistrict: sub_district,
            job: job_id,
            ethnic: ethnic_id,
            religion: religion_id,
            education: education_id,
            marital_status: marital_status,
            responsible_name: responsible_name,
            responsible_phone: responsible_phone,
            responsible_address: responsible_address,
            responsible_relation: responsible_relation,
            service_id: service_id,
            // unit_id: unit_id,
            doctor_id: user_id,
            payment_id: payment_id
          })
        });
        // console.log(await requestPost.json());

        if ([200, 201].includes(requestPost.status)) {
          return res.status(200).json({message: "Submit OK!"});
        }
        return res.status(400).json({message: "Submit FAILED!"});
      case "PUT":
        const {registration_id} = JSON.parse(req.body);
        const requestPut = await fetch(BASE_API + "/registration", {
          method: "PUT",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({registration_id: registration_id})
        });

        if ([200, 201].includes(requestPut.status)) {
          return res.status(200).json({message: "Move Screening!"});
        }
        return res.status(400).json({message: "Error"});
      default:
        return res.status(200).json({message: "Hello World"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}