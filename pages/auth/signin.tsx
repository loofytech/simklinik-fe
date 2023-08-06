export default function SignIn() {
  return <div className="w-full h-screen flex justify-center items-center px-8 md:px-0">
    <div className="w-full md:w-80 shadow p-3 rounded border">
      <h2 className="text-center font-semibold">Login Simklinik</h2>
      <div className="py-5">
        <div className="flex flex-col gap-1.5 text-sm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            className="w-full outline-none border px-2 py-1.5 rounded"
            role="presentation"
          />
        </div>
        <div className="flex flex-col gap-1.5 text-sm mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            className="w-full outline-none border px-2 py-1.5 rounded"
            role="presentation"
          />
        </div>
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded">Signin</button>
    </div>
  </div>
}