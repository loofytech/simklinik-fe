import { Select } from "antd";
import Cleave from "cleave.js/react";
import { useEffect, useState } from "react";

interface CProps {
  data: any;
}

export default function Screening({data}: CProps) {
  const [weight, setWeight] = useState<any>(null);
  const [height, setHeight] = useState<any>(null);
  const [temperature, setTemperature] = useState<any>(null);
  const [breath, setBreath] = useState<any>(null);
  const [pulse, setPulse] = useState<any>(null);
  const [bloodPressuremm, setBloodPressuremm] = useState<any>(null);
  const [bloodPressurehg, setBloodPressurehg] = useState<any>(null);
  const [imt, setImt] = useState<any>();
  const [oxygenSaturation, setOxygenSaturation] = useState<any>(null);
  const [bloodType, setBloodType] = useState<any>(null);
  const [diabetes, setDiabetes] = useState<any>(null);
  const [haemopilia, setHaemopilia] = useState<any>(null);
  const [heartDisease, setHeartDisease] = useState<any>(null);
  const [abdominalCircumference, setAbdominalCircumference] = useState<any>(null);
  const [historyOtherDesease, setHistoryOtherDesease] = useState<any>(null);
  const [historyTreatment, setHistoryTreatment] = useState<any>(null);
  const [allergyMedicine, setAllergyMedicine] = useState<any>(null);
  const [allergyFood, setAllergyFood] = useState<any>(null);

  useEffect(() => {
    setWeight(data?.body_weight);
    setHeight(data?.body_height);
    setTemperature(data?.body_temperature);
    setBreath(data?.body_breath);
    setPulse(data?.body_pulse);
    setImt(data?.body_imt);
    setOxygenSaturation(data?.body_oxygen_saturation);
    setBloodPressuremm(data?.body_blood_pressure_mm);
    setBloodPressurehg(data?.body_blood_pressure_hg);
    setBloodType(data?.registration?.patient?.blood_type);
    setDiabetes(data?.body_diabetes);
    setHaemopilia(data?.body_haemopilia);
    setHeartDisease(data?.body_heart_desease);
    setAbdominalCircumference(data?.abdominal_circumference);
    setHistoryOtherDesease(data?.history_other_desease);
    setHistoryTreatment(data?.history_treatment);
    setAllergyMedicine(data?.allergy_medicine);
    setAllergyFood(data?.allergy_food);
  }, [data]);

  return (<>
    <div className="grid grid-cols-2 gap-12">
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Berat Badan</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setWeight(evt.target.value)}
              value={weight}
            />
            <span className="mr-3 font-semibold">Kg</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Tinggi Badan</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setHeight(evt.target.value)}
              value={height}
            />
            <span className="mr-3 font-semibold">Cm</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Suhu Tubuh</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setTemperature(evt.target.value)}
              value={temperature}
            />
            <span className="mr-3 font-semibold">&deg;C</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Nafas</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setBreath(evt.target.value)}
              value={breath}
            />
            <span className="mr-3 font-semibold">kali/menit</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Denyut Nadi</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setPulse(evt.target.value)}
              value={pulse}
            />
            <span className="mr-3 font-semibold">kali/menit</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Tekanan Darah</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setBloodPressuremm(evt.target.value)}
              value={bloodPressuremm}
            />
            <span>/</span>
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setBloodPressurehg(evt.target.value)}
              value={bloodPressurehg}
            />
            <span className="mr-3 font-semibold">mmHg</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">IMT</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setImt(evt.target.value)}
              value={imt}
              disabled
            />
            <span className="mr-3 font-semibold">kg/m<sup>2</sup></span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Saturasi Oksigen</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setOxygenSaturation(evt.target.value)}
              value={oxygenSaturation}
            />
            <span className="mr-3 font-semibold">%</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Golongan Darah</div>
          <div className="flex items-center border w-full rounded-lg">
            <Select
              className="sc-select w-full"
              placeholder={"Pilih Golongan Darah"}
              onChange={(evt) => setBloodType(evt)}
              value={bloodType}
              options={[
                {label: "A", value: "A"},
                {label: "B", value: "B"},
                {label: "C", value: "C"},
                {label: "O", value: "O"},
                {label: "AB", value: "AB"},
              ]}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Diabetes</div>
          <div className="flex items-center border w-full rounded-lg">
            <Select
              className="sc-select w-full"
              placeholder={"Pilih Diabetes"}
              onChange={(evt) => setDiabetes(evt)}
              value={diabetes}
              options={[
                {label: "Belum Diketahui", value: "0"},
                {label: "Positif", value: "1"},
                {label: "Positif", value: "2"}
              ]}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Haemopilia</div>
          <div className="flex items-center border w-full rounded-lg">
            <Select
              className="sc-select w-full"
              placeholder={"Pilih Haemopilia"}
              onChange={(evt) => setHaemopilia(evt)}
              value={haemopilia}
              options={[
                {label: "Belum Diketahui", value: "0"},
                {label: "Positif", value: "1"},
                {label: "Positif", value: "2"}
              ]}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Sakit Jantung</div>
          <div className="flex items-center border w-full rounded-lg">
            <Select
              className="sc-select w-full"
              placeholder={"Pilih Sakit Jantung"}
              onChange={(evt) => setHeartDisease(evt)}
              value={heartDisease}
              options={[
                {label: "Belum Diketahui", value: "0"},
                {label: "Positif", value: "1"},
                {label: "Positif", value: "2"}
              ]}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="whitespace-nowrap font-semibold w-1/4">Lingkar Perut</div>
          <div className="flex items-center border w-full rounded-lg overflow-hidden">
            <Cleave
              options={{numeral: true, numeralDecimalMark: "thousand", delimiter: ".", numeralPositiveOnly: true}}
              className="h-10 text-sm w-full outline-none px-3"
              placeholder={""}
              onChange={(evt) => setAbdominalCircumference(evt.target.value)}
              value={abdominalCircumference}
            />
            <span className="mr-3 font-semibold">Cm</span>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <div className="font-bold mb-1">Riwayat Penyakit Lain</div>
      <textarea
        className="w-full outline-none border h-32 rounded-lg p-3"
        placeholder="Deskripsikan riwayat penyakit lain..."
        autoComplete="off"
        onChange={(evt) => setHistoryOtherDesease(evt.target.value)}
      >{historyOtherDesease}</textarea>
    </div>
    <div className="mt-3">
      <div className="font-bold mb-1">Riwayat Pengobatan</div>
      <textarea
        className="w-full outline-none border h-32 rounded-lg p-3"
        placeholder="Deskripsikan riwayat pengobatan..."
        autoComplete="off"
        onChange={(evt) => setHistoryTreatment(evt.target.value)}
      >{historyTreatment}</textarea>
    </div>
    <div className="mt-3">
      <div className="font-bold mb-1">Alergi Obat</div>
      <textarea
        className="w-full outline-none border h-32 rounded-lg p-3"
        placeholder="Deskripsikan alergi obat..."
        autoComplete="off"
        onChange={(evt) => setAllergyMedicine(evt.target.value)}
      >{allergyMedicine}</textarea>
    </div>
    <div className="mt-3">
      <div className="font-bold mb-1">Alergi Makanan</div>
      <textarea
        className="w-full outline-none border h-32 rounded-lg p-3"
        placeholder="Deskripsikan alergi makanan..."
        autoComplete="off"
        onChange={(evt) => setAllergyFood(evt.target.value)}
      >{allergyFood}</textarea>
    </div>
    <div className="mt-5 flex items-center justify-center">
      <button type="button" className="bg-primary text-white px-5 py-1.5 text-lg font-bold rounded-lg">Submit</button>
    </div>
  </>);
}