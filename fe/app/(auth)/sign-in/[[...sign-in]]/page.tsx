import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

import { SignInForm } from "@/fe/components/SignInForm";
import LoginImage from "@/public/illustration/login.png";
import logo from "@/public/assets/logo.svg";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={LoginImage}
          alt="Login Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Image src={logo} alt="logo" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
