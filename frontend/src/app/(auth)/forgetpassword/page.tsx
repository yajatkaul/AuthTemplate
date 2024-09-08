"use client";
import useForgetPassword from "@/hooks/useForgetPassword";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { loading, forgetPassword } = useForgetPassword();
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleForget = (e: any) => {
    e.preventDefault();
    if (submit) {
      return;
    }
    forgetPassword(email);

    if (!email) {
      return;
    }
    setSubmit(!submit);
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
        <form className="flex" onSubmit={handleForget}>
          <div className="flex flex-col justify-center items-center p-4 max-w-[400px] gap-4 rounded-[30px] md:rounded-none md:rounded-r-[30px] bg-[#E0D7CF]">
            <img src="/Logo.png" className="w-[250px] mb-[30px]" />
            {submit ? (
              <>
                <div className="flex flex-col gap-10 w-[250px] justify-center items-center">
                  <CircleCheckBig className="w-[100px] h-[100px]" />
                  <button
                    className="btn w-full"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </>
            ) : (
              <>
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
                    defaultValue={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
                <div className="divider" />
                <button className="btn w-full">
                  {loading ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    "Reset"
                  )}
                </button>
                <button
                  className="btn w-full"
                  type="button"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
