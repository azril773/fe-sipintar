"use client";

import { AcademicCapIcon } from "@heroicons/react/16/solid";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DOMAIN } from "@/src/constants";
import { AccessTokenClaim } from "@/src/types/jwt";
import { cookies } from "@/src/utils";
import { notification } from "@/src/utils/toast";
import { LoginResponse } from "@/types/login";

import { login } from "../_api/auth";


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { accessToken, error }: LoginResponse = await login(email, password);
    if (error.length > 0) {
      notification("Error!", error, "error");
      setIsLoading(false);
      return;
    }
    const token: AccessTokenClaim = jwtDecode(accessToken ?? "");
    if (!token.subdomain || token.subdomain == "") {
      cookies.set("access_token", accessToken, { path: "/" });
      setIsLoading(true);
      router.push("/dashboard");
    } else {
      notification("Login Berhasil!", "Anda akan diarahkan ke subdomain Anda.", "success");
      setTimeout(() => {
        window.location.href =
          (process.env.HTTP_SECURE ? "https://" : "http://") +
          `${token.subdomain}.${DOMAIN}`;
      }, 1000);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="min-w-[60%] hidden sm:block">
        <div className="flex flex-col pl-24 pt-14">
          <div className="flex gap-3 my-10">
            <div className="bg-black rounded-md p-2 items-center flex">
              <AcademicCapIcon color="white" width={60} />
            </div>
            <div>
              <h1 className="text-4xl font-bold drop-shadow-lg">SiPintar</h1>
              <p className="text-lg text-emerald-600">
                Sistem Informasi Pendidikan
              </p>
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tighter mb-6  text-slate-950">
            Wujudkan Anak{" "}
            <span className="text-gradient">
              {" "}
              <br /> Tasik Rancage <br />
            </span>{" "}
            Lewat Digitalisasi.
          </h1>

          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg font-medium">
            SiPintar dirancang untuk membantu Guru dan Orang Tua bersinergi
            dalam memantau pertumbuhan karakter anak secara praktis, transparan,
            dan berkelanjutan.
          </p>
        </div>
      </div>
      <div className="w-full shadow-[0px_0px_4px_4px_rgba(0,0,0,0.3)] rounded-bg-login bg-linear-to-br from-[#1e3a8a] to-[#059669] min-h-screen flex items-center justify-center">
        <div className="rounded-lg w-[75%] backdrop-blur-3xl shadow  p-4">
          <p className="text-2xl font-semibold text-center text-white">Login</p>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className=" text-white font-semibold text-md"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-2 border-gray-200 text-foreground placeholder:text-gray-400 h-11 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-white font-semibold text-md"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-2 border-gray-200 text-foreground placeholder:text-gray-400 h-11 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            <Button
              onClick={() => handleLogin()}
              type="button"
              className="w-full h-11  hover:shadow-lg text-white bg-emerald-600 font-semibold text-base transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
