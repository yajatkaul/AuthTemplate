"use client";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import { useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [inputs, setInputs] = useState({ password: "", confirmPassword: "" });
  const { loading, updatePassword } = useUpdatePassword(params.id);

  const handleReset = (e: any) => {
    e.preventDefault();
    updatePassword(inputs);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/bg.jpg')] bg-fixed bg-no-repeat bg-cover">
      <div className="flex">
        <div>
          <img
            src="/authImage.png"
            alt="image"
            className="max-h-[600px] rounded-l-[30px] hidden md:flex min-h-[500px] object-cover"
          />
        </div>
        <form className="flex" onSubmit={handleReset}>
          <div className="flex flex-col justify-center items-center p-4 max-w-[400px] gap-4 rounded-[30px] md:rounded-none md:rounded-r-[30px] bg-[#E0D7CF]">
            <img src="/Logo.png" className="w-[250px] mb-[20px]" />
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                defaultValue={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Confrim Password"
                defaultValue={inputs.confirmPassword}
                onChange={(e) => {
                  setInputs({ ...inputs, confirmPassword: e.target.value });
                }}
              />
            </label>
            <div className="divider"></div>
            <div className="flex justify-start items-start w-full"></div>

            <button className="btn w-full">
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Reset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
