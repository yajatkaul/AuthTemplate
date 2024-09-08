"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerification from "@/hooks/useVerification";
import { useState } from "react";

const Page = () => {
  const [otp, setOtp] = useState({
    token: "",
  });
  const { loading, verify } = useVerification();
  const handleVerification = (e: any) => {
    e.preventDefault();
    verify(otp);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/bg.jpg')] bg-fixed bg-no-repeat bg-cover">
      <form
        className="flex flex-col bg-[#E0D7CF] h-[400px] rounded-[40px] justify-center items-center"
        onSubmit={handleVerification}
      >
        <img src="/logo.png" alt="" className="flex w-[200px] mb-[30px]" />

        <p className="flex justify-center items-center text-[40px] font-bold">
          Verify
        </p>
        <p>Kindly check your inbox for the</p>
        <p>verification code</p>
        <div className="flex flex-col justify-center items-center p-4 max-w-[400px] gap-4 rounded-[30px]">
          <InputOTP
            maxLength={6}
            defaultValue={otp.token}
            onChange={(e) => setOtp({ ...otp, token: e })}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="border border-black" />
              <InputOTPSlot index={1} className="border border-black" />
              <InputOTPSlot index={2} className="border border-black" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="border border-black" />
              <InputOTPSlot index={4} className="border border-black" />
              <InputOTPSlot index={5} className="border border-black" />
            </InputOTPGroup>
          </InputOTP>
          <button className="btn w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
