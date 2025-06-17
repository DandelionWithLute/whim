import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-sky-300">
      <Header />
      <div className="h-12"></div>
      <div className="w-full h-[calc(100vh-48px)] p-8 flex gap-8">
        {/* Side container */}
        <div className="flex flex-col gap-3 w-full bg-gradient-to-br from-red-50 to-blue-50 border border-amber-50 rounded-md p-3 relative">
          <div className="text-7xl shadow-2xl w-fit p-3 rounded-md border m-auto">写作大师</div>
          <div className="w-full flex gap-24 justify-between px-16">
            <Image src={"/eg.png"} alt="eg.png" width={500} height={500} className="" />
            <div>
              <div>还在为文思枯竭、下笔无神而烦恼吗？ 写作大师，一款革命性的AI写作工具，将彻底改变您的创作体验！</div>
              <br />
              <br />
              <div>
                我们深知您在写作过程中可能遇到的挑战：耗时费力、缺乏灵感、表达平淡……写作大师正是为此而生。 <br />
                它不仅仅是一个简单的文字处理器，更是一位全能的智能助理， <br />
                助您轻松驾驭各种文体，创作出引人入胜的优质内容。
              </div>

              <ul>
                <li className="flex items-center">· 内容创作者： 博客作者、社交媒体运营者、文案撰稿人，助您源源不断地产出高质量内容。</li>
                <li className="flex items-center">· 市场营销人员： 广告语、推广文案、产品描述，让您的营销信息更具吸引力。</li>
                <li className="flex items-center">· 学生与学者： 论文、报告、作业，帮助您提升写作效率和质量。</li>
                <li className="flex items-center">· 职场人士： 邮件、报告、演示文稿，让您的职场沟通更加专业高效。</li>
                <li className="flex items-center">· 以及每一个热爱文字、渴望高效表达的您！</li>
              </ul>
            </div>
          </div>
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  );
}
