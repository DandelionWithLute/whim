"use client";
import Header from "@/components/Header";
import axios from "axios";
import { Pen, PlusIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const user = useSession().data;
  const status = useSession().status;
  const router = useRouter();
  console.log(user, status);

  const [fetchAllMyPostsData, setFetchAllMyPosts] = useState<object[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const publicRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetchAllMyPosts();
  }, []);

  async function fetchAllMyPosts() {
    const data = await axios.get("/api/post").then((res) => res.data);
    if (data.msg) return toast.error(data.msg);
    setFetchAllMyPosts(data);
  }

  async function createNewPost() {
    const data = await axios
      .post("/api/post/create", {
        title: titleRef.current?.value ?? "",
        content: contentRef.current?.value ?? "",
        publicity: publicRef.current?.value ?? "",
      })
      .then((res) => res.data);
    if (data.id)
      setTimeout(() => {
        router.push("/main/" + data.id);
      }, 3000);
    if (data.msg == "创建成功！") {
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
                createNewPost();
              }}
              className="p-3 bg-white border rounded-md w-fit cursor-pointer select-none hover:scale-[105%] active:scale-[97%]">
              <PlusIcon />
            </div>
            <div
              onClick={() => {
                toast.error("请选中下方文章以继续删除哦！");
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
          <div className="text-5xl font-bold">写作大师能为您做什么？</div>
          <div className="h-12"></div>
          <div className="text-2xl font-bold">激发灵感，告别空白：</div>
          <div className="">
            无论您是需要一个引人入胜的标题、一段富有创意的开头，还是一些全新的观点，
            <br />
            写作大师都能在瞬间为您提供海量灵感，让您的思绪不再停滞。
          </div>
          <div className="text-2xl font-bold">智能润色，提升文采：</div>
          <div className="">
            语法错误、表达不准确、词汇匮乏？这些都将成为过去式！
            <br />
            写作大师拥有强大的语言处理能力，能够实时检测并修正您的文字，
            <br />
            让您的文章流畅自然，更具专业水准。
          </div>
          <div className="text-2xl font-bold">高效创作，节省时间：</div>
          <div className="">
            无论是营销文案、社交媒体帖子、博客文章，还是更复杂的报告和论文，
            <br />
            写作大师都能根据您的需求快速生成初稿，大幅缩短您的创作周期。
          </div>
          <div className="text-2xl font-bold">个性定制，风格随心：</div>
          <div className="">
            您可以根据不同的情境和受众，调整写作大师的语气和风格，
            <br />
            无论是正式严谨、幽默风趣，还是亲切随和，都能轻松驾驭，让您的内容更贴合受众喜好。
          </div>
          <textarea ref={contentRef} className="w-full p-5 border rounded-md outline-none" placeholder="开始新的写作..." />
          <div className="flex gap-3 justify-end">
            <select ref={publicRef} className="outline-none border rounded-md p-3">
              <option value={"public"}>发布</option>
              <option value={"private"}>私密</option>
            </select>
            <input ref={titleRef} className="outline-none border rounded-md p-3" placeholder="标题..." />
            <button
              onClick={() => {
                createNewPost();
              }}
              className="p-3 rounded-md border bg-green-50 select-none cursor-pointer hover:scale-110 active:scale-95">
              继续...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
