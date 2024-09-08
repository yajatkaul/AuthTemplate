"use client";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { loading, login } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e: any) => {
    e.preventDefault();
    login(inputs);
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
        <form className="flex" onSubmit={handleLogin}>
          <div className="flex flex-col justify-center items-center p-4 max-w-[400px] gap-4 rounded-[30px] md:rounded-none md:rounded-r-[30px] bg-[#E0D7CF]">
            <img src="/Logo.png" className="w-[250px]" />
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                defaultValue={inputs.email}
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
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
                placeholder="Password"
                defaultValue={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </label>
            <div className="divider"></div>
            <div className="flex justify-start items-start w-full">
              <p
                className="flex cursor-pointer"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                {"Don't have an account?"}
              </p>
            </div>

            <button className="btn w-full">
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
            <a
              className="cursor-pointer"
              onClick={() => {
                router.push("/forgetpassword");
              }}
            >
              Forgot Password
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
