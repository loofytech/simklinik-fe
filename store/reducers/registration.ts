import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registrationSlice",
  initialState: {
    medical_record: null,
    patient_name: null,
    patient_address: null,
    patient_phone: null,
    patient_nik: null,
    patient_gender: null,
    patient_blood_type: null,
    birth_place: null,
    birth_date: null,
    province: null,
    regency: null,
    district: null,
    sub_district: null,
    job_id: null,
    ethnic_id: null,
    religion_id: null,
    education_id: null,
    marital_status: null,
    responsible_name: null,
    responsible_phone: null,
    responsible_address: null,
    responsible_relation: null,
    service_id: null,
    unit_id: null,
    user_id: null,
    payment_id: null
  },
  reducers: {
    SET_MEDICAL_RECORD: (state, param) => {
      state.medical_record = param.payload;
    },
    SET_PATIENT_NAME: (state, param) => {
      state.patient_name = param.payload;
    },
    SET_PATIENT_ADDRESS: (state, param) => {
      state.patient_address = param.payload;
    },
    SET_PATIENT_PHONE: (state, param) => {
      state.patient_phone = param.payload;
    },
    SET_PATIENT_NIK: (state, param) => {
      state.patient_nik = param.payload;
    },
    SET_PATIENT_GENDER: (state, param) => {
      state.patient_gender = param.payload;
    },
    SET_PATIENT_BLOOD_TYPE: (state, param) => {
      state.patient_blood_type = param.payload;
    },
    SET_BIRTH_PLACE: (state, param) => {
      state.birth_place = param.payload;
    },
    SET_BIRTH_DATE: (state, param) => {
      state.birth_date = param.payload;
    },
    SET_PROVINCE: (state, param) => {
      state.province = param.payload;
    },
    SET_REGENCY: (state, param) => {
      state.regency = param.payload;
    },
    SET_DISTRICT: (state, param) => {
      state.district = param.payload;
    },
    SET_SUBDISTRICT: (state, param) => {
      state.sub_district = param.payload;
    },
    SET_JOB: (state, param) => {
      state.job_id = param.payload;
    },
    SET_ETHNIC: (state, param) => {
      state.ethnic_id = param.payload;
    },
    SET_RELIGION: (state, param) => {
      state.religion_id = param.payload;
    },
    SET_EDUCATION: (state, param) => {
      state.education_id = param.payload;
    },
    SET_MARITAL_STATUS: (state, param) => {
      state.marital_status = param.payload;
    },
    SET_RESPONSIBLE_NAME: (state, param) => {
      state.responsible_name = param.payload;
    },
    SET_RESPONSIBLE_PHONE: (state, param) => {
      state.responsible_phone = param.payload;
    },
    SET_RESPONSIBLE_ADDRESS: (state, param) => {
      state.responsible_address = param.payload;
    },
    SET_RESPONSIBLE_RELATION: (state, param) => {
      state.responsible_relation = param.payload;
    },
    SET_SERVICE_ID: (state, param) => {
      state.service_id = param.payload;
    },
    SET_UNIT_ID: (state, param) => {
      state.unit_id = param.payload;
    },
    SET_USER_ID: (state, param) => {
      state.user_id = param.payload;
    },
    SET_PAYMENT_ID: (state, param) => {
      state.payment_id = param.payload;
    }
  }
});

export const {
  SET_MEDICAL_RECORD,
  SET_PATIENT_NAME,
  SET_PATIENT_ADDRESS,
  SET_PATIENT_PHONE,
  SET_PATIENT_NIK,
  SET_PATIENT_GENDER,
  SET_PATIENT_BLOOD_TYPE,
  SET_BIRTH_PLACE,
  SET_BIRTH_DATE,
  SET_PROVINCE,
  SET_REGENCY,
  SET_DISTRICT,
  SET_SUBDISTRICT,
  SET_JOB,
  SET_ETHNIC,
  SET_RELIGION,
  SET_EDUCATION,
  SET_MARITAL_STATUS,
  SET_RESPONSIBLE_NAME,
  SET_RESPONSIBLE_PHONE,
  SET_RESPONSIBLE_ADDRESS,
  SET_RESPONSIBLE_RELATION,
  SET_SERVICE_ID,
  SET_UNIT_ID,
  SET_USER_ID,
  SET_PAYMENT_ID
} = registrationSlice.actions;

export default registrationSlice.reducer;