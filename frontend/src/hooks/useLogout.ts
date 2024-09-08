import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);

  const logout = async () => {
    try {
      if (called) return;
      setCalled(true);
      setLoading(true);
      const res = await fetch("/api/auth/logout");

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      await localStorage.removeItem("Auth");

      toast.success("Logged Out");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
