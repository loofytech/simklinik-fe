export default function CInspection() {
  return (<>
    <div className="flex flex-col gap-1">
      <span className="font-semibold">Anamnesa</span>
      <textarea className="h-32 border rounded-lg outline-none p-3"></textarea>
    </div>
    <hr className="mb-3 mt-6" />
    <span className="text-lg font-bold">Catatan</span>
    <div className="grid grid-cols-1 gap-3 mt-5">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Obyektif</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">KU</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Thoarks</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Terapi</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Edukasi</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Instruksi</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Abd</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Extremitas</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Diagnosa Kerja</span>
        <textarea className="h-24 border rounded-lg outline-none p-3"></textarea>
      </div>
    </div>
    <hr className="my-5" />
    <div className="flex items-center gap-1">
      <span className="font-semibold">Diagnosa</span>
      
    </div>
  </>);
}