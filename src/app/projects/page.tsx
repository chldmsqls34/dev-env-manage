
import { CreateProject } from "@/components/project/ProjectButton";
import { fetchAllProject } from "@/lib/data";
import { redirect } from "next/navigation";


export default async function Page() {
  const projects = await fetchAllProject();

  if (!projects || projects.length === 0) {
    return (
      <main className="w-full h-screen">
        <div className="flex flex-col w-full h-full bg-slate-100 items-center justify-center space-y-2">
          <h1 className="mb-4 text-xl md:text-2xl font-bold">How to start</h1>
          <p>1. Create a page</p>
          <p>2. Add boards to page</p>
          <CreateProject />
        </div>
      </main>
    );
  }


  const firstProjectId = projects[0].id; // 첫 번째 프로젝트 ID 가져오기
  redirect(`/projects/${firstProjectId}`);


}