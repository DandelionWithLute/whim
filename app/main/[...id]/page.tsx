"use client";
import Header from "@/components/Header";
import axios from "axios";
import { Link2Icon, Pen, PlusIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const user = useSession().data;
  const status = useSession().status;
  const router = useRouter();
  const pathName = usePathname();
  const postId = pathName.split("/").pop();
  console.log(user, status);

  const [fetchAllMyPostsData, setFetchAllMyPosts] = useState<object[]>([]);
  const [fetchCurrentPost, setFetchCurrentPost] = useState<object>({
    id: postId,
    createdAt: "2025-01-01T09:50:56.129Z",
    title: "",
    content: "",
    published: false,
    authorId: 1,
  });

  useEffect(() => {
    fetchAllMyPosts();
    fetchCurrentPosts();
  }, []);

  async function deleteCurrentPost() {
    const data = await axios.post("/api/post/delete", { postId }).then((res) => res.data);
    if (data.msg == "删除成功！") {
      toast.success(data.msg);
      setTimeout(() => {
        router.push("/main"), 3000;
      });
    } else {
      toast.error(data.msg);
    }
  }

  async function fetchCurrentPosts() {
    const data = await axios.get("/api/post/current?postId=" + postId).then((res) => res.data);
    if (data.msg) return toast.error(data.msg);
    setFetchCurrentPost(data);
  }

  async function fetchAllMyPosts() {
    const data = await axios.get("/api/post").then((res) => res.data);
    if (data.msg) return toast.error(data.msg);
    setFetchAllMyPosts(data);
  }

  async function createNewPost() {
    const data = await axios
      .post("/api/post/create", {
        title: "",
        content: "",
      })
      .then((res) => res.data);

    if (data.msg == "创建成功！") {
      setTimeout(() => {
        router.push("/main/" + data.id);
      }, 100);
      fetchAllMyPosts();
      return toast.success(data.msg);
    } else return toast.error(data.msg);
  }

  return (
    <div className="w-full h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-sky-300">
      <Header />
      <div className="h-12"></div>
      <div className="w-full h-[calc(100vh-48px)] p-8 flex gap-8">
        {/* Side container */}
        <div className="flex flex-col gap-3 w-60 bg-gradient-to-br from-red-50 to-blue-50 border border-amber-50 rounded-md p-3">
          <div className="flex w-full gap-3">
            <div
              onClick={() => {
                router.push("/main");
                // Not on subpage
                // createNewPost();
              }}
              className="p-3 bg-white border rounded-md w-fit cursor-pointer select-none hover:scale-[105%] active:scale-[97%]">
              <PlusIcon />
            </div>
            <div
              onClick={() => {
                deleteCurrentPost();
              }}
              className="p-3 bg-white border rounded-md w-fit cursor-pointer select-none hover:scale-[105%] active:scale-[97%]">
              <Trash2 />
            </div>
            <div className="p-3 bg-white border rounded-md w-fit cursor-pointer select-none hover:scale-[105%] active:scale-[97%]">
              <Pen />
            </div>
          </div>
          {/* <div className="p-3 bg-white border rounded-md">1</div> */}
          {fetchAllMyPostsData.map((i: any) => (
            <div
              key={i.id}
              onClick={() => {
                router.push(`/main/${i.id}`);
              }}
              className="p-3 bg-white border rounded-md cursor-pointer select-none hover:scale-[105%] active:scale-[97%]">
              {i.title}
            </div>
          ))}
        </div>
        {/* Main container */}
        <div className="flex flex-col gap-3 w-full bg-gradient-to-br from-red-50 to-blue-50 border border-amber-50 rounded-md p-3 px-8">
          <div className="h-12"></div>
          {/* @ts-ignore */}
          <div className="text-5xl font-bold">{fetchCurrentPost.title}</div>
          <div className="h-12"></div>
          {/* @ts-ignore */}
          {fetchCurrentPost.content && <div className="text-2xl font-bold">正文：</div>}
          {/* @ts-ignore */}
          {fetchCurrentPost.published && <Link href={"/public/" + fetchCurrentPost.id} className="text-sky-500 flex gap-3">此文章是公开文章，点击跳转公开页面<Link2Icon /></Link>}
          <div className="">
            {/* @ts-ignore */}
            {fetchCurrentPost.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
