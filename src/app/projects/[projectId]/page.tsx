import ProjectInfo from "@/components/project/ProjectInfo";
import Sidebar from "@/components/project/Sidebar";
import { CreateTaskWithSecondaryButton } from "@/components/project/task/TaskButton";
import TaskList from "@/components/project/task/TaskList";
import { fetchAllProject, fetchProgress, fetchProjectById, fetchTaskByProjectId } from "@/lib/data";
import { notFound } from "next/navigation";


export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {

  const {projectId} = await params;
  const [project,tasks,progressData,projects] = await Promise.all([
    fetchProjectById(projectId),
    fetchTaskByProjectId(projectId),
    fetchProgress(projectId),
    fetchAllProject()
  ]);

  if(!project){
    notFound();
  }

  if (!tasks || tasks.length === 0) {
    return (
      <main className="w-full h-screen flex">
        <div className="flex w-full h-full mx-40 justify-center">
          <div className="w-28 md:w-64">
            <Sidebar projects={projects} project={project}/>
          </div>
          <div className="flex flex-col h-full bg-slate-100 items-center justify-center">
            <ProjectInfo project={project} progressData={progressData}/>
            <div className="flex flex-col w-full h-full px-6 py-4 space-y-4 bg-gray-100 items-center justify-center">
              <h1 className="text-lg font-bold">There is no board yet.</h1>
              <p className="text-sm">Click the button and start flashing!</p>
              <CreateTaskWithSecondaryButton projectId={projectId} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return(
    <main className="w-full h-screen flex">
      <div className="flex w-full h-full mx-40 justify-center">
        <div className="w-28 md:w-64">
          <Sidebar projects={projects} project={project}/>
        </div>
        <div className="flex flex-col">
          <ProjectInfo project={project} progressData={progressData} />
          <TaskList tasks={tasks}/>
        </div>
      </div>
    </main>
  )
}