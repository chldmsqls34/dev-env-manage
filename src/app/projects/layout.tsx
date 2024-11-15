import Sidebar from "@/components/project/Sidebar";
import { fetchAllProject } from "@/lib/data";


export default async function Layout({ children }: { children: React.ReactNode }) {

  const projects = await fetchAllProject();

  return (
    <main className="w-screen h-screen">
      <div className="flex justify-center md:mx-40">
        <div className="w-28 md:w-64">
          <Sidebar projects={projects}/>
        </div>
        <div className="grow">{children}</div>
      </div>
    </main>
  );
}