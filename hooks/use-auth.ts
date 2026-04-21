import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

import { AccessTokenClaim } from "@/src/types/jwt";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<AccessTokenClaim | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");

    setToken(accessToken || null);
    if (accessToken) {
      try {
        setDecoded(jwtDecode<AccessTokenClaim>(accessToken));
      } catch {
        setDecoded(null);
      }
    } else {
      setDecoded(null);
    }

    setIsLoading(false);
  }, []);

  return { token, decoded, isLoading };
}
