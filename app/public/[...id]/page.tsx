"use client";
import Header from "@/components/Header";
import axios from "axios";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const searchParams = usePathname();
  const id = searchParams.split("/").pop();

  const [publicPostData, setPublicPostData] = useState({});

  useEffect(() => {
    fetchPostPublic();
  }, []);

  async function fetchPostPublic() {
    const data = await axios.get(`/api/post/public?id=${id}`).then((res) => res.data);
    if (data.msg) return toast.error(data.msg);
    setPublicPostData(data);
    console.log(data);
  }

  return (
    <div className="w-full h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-sky-300">
      <Header />
      <div className="h-12"></div>
      <div className="w-full h-[calc(100vh-48px)] p-8 flex gap-8">
        <div className="flex flex-col items-center gap-3 w-full bg-gradient-to-br from-red-50 to-blue-50 border border-amber-50 rounded-md p-3 px-8">
          {/* @ts-ignore */}
          <div>{publicPostData.title}</div>
          {/* @ts-ignore */}
          <div>{publicPostData.createdAt}</div>
          {/* @ts-ignore */}
          <div>{publicPostData.content}</div>
        </div>
      </div>
    </div>
  );
};

export default page;
