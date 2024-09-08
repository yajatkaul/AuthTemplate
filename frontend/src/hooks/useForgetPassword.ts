import { useState } from "react";
import toast from "react-hot-toast";

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const forgetPassword = async (email: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Logged in");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, forgetPassword };
};

export default useForgetPassword;
