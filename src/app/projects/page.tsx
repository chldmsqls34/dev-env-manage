
import { CreateProject } from "@/components/project/ProjectButton";
import Sidebar from "@/components/project/Sidebar";
import { fetchAllProject } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page() {
  const projects = await fetchAllProject();
  const project = null;

  if (!projects || projects.length === 0) {
    return (
      <main className="w-screen h-screen flex">
        <div className="flex w-full h-full mx-40">
          <div>
            <Sidebar projects={projects} project={project}/>
          </div>
          <div className="flex flex-col w-full h-full bg-slate-100 items-center justify-center space-y-2">
            <h1 className="mb-4 text-xl md:text-2xl font-bold">How to start</h1>
            <p>1. Create a page</p>
            <p>2. Add boards to page</p>
            <CreateProject />
          </div>
        </div>
      </main>
    );
  }

  const firstProjectId = projects[0].id;
  redirect(`/projects/${firstProjectId}`);


}