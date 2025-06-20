"use client";
import { Pen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const user = useSession().data?.user;
  const status = useSession().status;

  const [avatarDropDown, setAvatarDropDown] = useState(false);

  return (
    <div className="w-full h-12 bg-amber-50 flex items-center shadow-md absolute top-0 z-50">
      <div className="w-24"></div>
      <div
        className="absolute left-24 text-2xl flex gap-3 items-center font-bold select-none cursor-pointer"
        onClick={() => {
          router.push("/");
        }}>
        <Pen />
        写作大师
      </div>
      <div className="w-full"></div>

      <div className="min-w-fit absolute right-24 select-none cursor-pointer">
        {status == "authenticated" ? (
          <Image
            onClick={() => {
              setAvatarDropDown(!avatarDropDown);
            }}
            src={"/man.jpg"}
            width={36}
            height={36}
            alt="man.jpg"
            className="rounded-full object-cover w-10 h-10"
          />
        ) : (
          <div
            onClick={() => {
              setAvatarDropDown(!avatarDropDown);
            }}
            className="rounded-full object-cover w-10 h-10 bg-gray-100 flex justify-center items-center">
            ?
          </div>
        )}
      </div>
      {/* avatar dropdown container */}
      {avatarDropDown && (
        <div className="w-32 bg-white rounded-md absolute right-12 top-14 p-3 flex flex-col gap-1.5">
          {status == "unauthenticated" && (
            <div
              className="p-1.5 hover:bg-amber-100 active:bg-amber-300 rounded-md select-none cursor-pointer"
              onClick={() => {
                router.push("/login");
              }}>
              登录
            </div>
          )}
          {status == "unauthenticated" && (
            <div
              className="p-1.5 hover:bg-amber-100 active:bg-amber-300 rounded-md select-none cursor-pointer"
              onClick={() => {
                router.push("/register");
              }}>
              注册
            </div>
          )}
          {status == "authenticated" && (
            <div
              className="p-1.5 hover:bg-amber-100 active:bg-amber-300 rounded-md select-none cursor-pointer"
              onClick={() => {
               router.push("/me")
              }}>
              我的
            </div>
          )}
          {status == "authenticated" && (
            <div
              className="p-1.5 hover:bg-amber-100 active:bg-amber-300 rounded-md select-none cursor-pointer"
              onClick={() => {
               router.push("/main")
              }}>
              主页
            </div>
          )}
          {status == "authenticated" && (
            <div
              className="p-1.5 hover:bg-amber-100 active:bg-amber-300 rounded-md select-none cursor-pointer"
              onClick={() => {
                toast.success("已成功登出！");
                signOut();
              }}>
              登出
            </div>
          )}
        </div>
      )}
      <div className="w-24"></div>
    </div>
  );
};

export default Header;
