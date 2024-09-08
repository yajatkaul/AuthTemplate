import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignupProps {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const signup = async ({
    email,
    displayName,
    password,
    confirmPassword,
  }: SignupProps) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, displayName, password, confirmPassword }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("Auth", JSON.stringify(data));

      await setAuthUser(data.details);

      toast.success("Success");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
