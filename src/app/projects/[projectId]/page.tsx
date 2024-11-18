import ProjectInfo from "@/components/project/ProjectInfo";
import TaskList from "@/components/project/task/TaskList";
import { fetchProgress, fetchProjectById, fetchTaskByProjectId } from "@/lib/data";
import { notFound } from "next/navigation";


export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {

  const {projectId} = await params;
  const [project,tasks,progressData] = await Promise.all([
    fetchProjectById(projectId),
    fetchTaskByProjectId(projectId),
    fetchProgress(projectId),
  ]);

  if(!project){
    notFound();
  }

  if (!tasks || tasks.length === 0) {
    return (
      <main className="w-full h-screen">
        <div className="flex flex-col w-full h-full bg-slate-100 items-center justify-center">
          <ProjectInfo project={project} progressData={progressData}/>
          <div className="w-full h-full px-6 py-4 space-y-4 bg-gray-100">
          </div>
        </div>
      </main>
    );
  }

  return(
    <div className="flex flex-col h-screen">
      <ProjectInfo project={project} progressData={progressData} />
      <TaskList tasks={tasks}/>
    </div>
  )
}