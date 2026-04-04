import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    console.log(accessToken)
    setToken(accessToken || null);
    setIsLoading(false);
  }, []);

  return { token, isLoading };
}
