"use client";
import Header from "@/components/Header";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const page = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const patheName = usePathname();
  const status = useSession().status;
  if (status == "authenticated") router.push("/main");

  return (
    <div className="relative w-full h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-sky-300">
      <Header />
      {/* Main Container */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[300px] h-[500px] bg-amber-50 p-8 relative rounded-md">
          <div className="h-6"></div>
          <div className="w-full flex justify-center text-2xl">登录</div>
          <div className="h-6"></div>
          <div className="relative top-3 bg-amber-50 w-fit left-3">邮箱</div>
          <input ref={emailRef} type="email" className="border rounded-md outline-none p-3 w-full shadow-sm" />
          <div className="relative top-3 bg-amber-50 w-fit left-3">密码</div>
          <input ref={passwordRef} type="password" className="border rounded-md outline-none p-3 w-full shadow-sm" />
          <div className="h-6"></div>
          <button
            onClick={async () => {
              if (!emailRef.current?.value || !passwordRef.current?.value) toast.error("请补充登录信息！");

              const res = await signIn("credentials", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                redirectTo: "/main",
                redirect: false,
              });
              console.log(res);
              if (res.error) {
                toast.error("登陆失败！");
              } else {
                toast.success("登录成功！");
              }
              //   res.code 根据情况
            }}
            className="w-full p-3 border rounded-md shadow-sm cursor-pointer select-none hover:font-bold hover:scale-[102%] active:scale-[99%]">
            提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
