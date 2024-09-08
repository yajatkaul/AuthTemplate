import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

interface LoginProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { setAuthUser } = useAuthContext();
  const login = async ({ email, password }: LoginProps) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("Auth", JSON.stringify(data));

      await setAuthUser(data.details);

      toast.success("Logged in");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
