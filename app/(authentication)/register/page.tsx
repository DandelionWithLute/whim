"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const page = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const status = useSession().status;
  if (status == "authenticated") router.push("/main");

  async function createNewUser() {
    // toast.success("123");
    if (!nameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) return toast.error("请补充完成注册信息哦！");
    const data = await axios
      .post("/api/register", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      })
      .then((res) => res.data);

    if (data == "注册成功！") {
      toast.success("注册成功！");
      setTimeout(() => router.push("/login"));
    } else {
      toast.error(data);
    }
  }

  return (
    <div className="relative w-full h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-sky-300">
      <Header />
      <div className="h-12"></div>
      {/* Main Container */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[300px] h-[500px] bg-amber-50 p-8 relative rounded-md">
          <div className="h-6"></div>
          <div className="w-full flex justify-center text-2xl">注册</div>
          <div className="h-6"></div>
          <div className="relative top-3 bg-amber-50 w-fit left-3">姓名</div>
          <input ref={nameRef} className="border rounded-md outline-none p-3 w-full shadow-sm" />
          <div className="relative top-3 bg-amber-50 w-fit left-3">邮箱</div>
          <input ref={emailRef} className="border rounded-md outline-none p-3 w-full shadow-sm" />
          <div className="relative top-3 bg-amber-50 w-fit left-3">密码</div>
          <input ref={passwordRef} className="border rounded-md outline-none p-3 w-full shadow-sm" />
          <div className="h-6"></div>
          <button
            onClick={async () => createNewUser()}
            className="w-full p-3 border rounded-md shadow-sm cursor-pointer select-none hover:font-bold hover:scale-[102%] active:scale-[99%]">
            提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
