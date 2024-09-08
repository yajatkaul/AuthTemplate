import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InputProps {
  password: string;
  confirmPassword: string;
}

const useUpdatePassword = (token: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const updatePassword = async ({ password, confirmPassword }: InputProps) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/auth//reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.result);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updatePassword };
};

export default useUpdatePassword;
