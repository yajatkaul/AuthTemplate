import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VerificationProps {
  token: string;
}

const useVerification = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const verify = async ({ token }: VerificationProps) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Verified");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, verify };
};

export default useVerification;
