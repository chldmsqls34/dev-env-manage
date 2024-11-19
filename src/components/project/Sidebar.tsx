"use client";
import { ClientProject } from "@/types/Project";
import { Input } from "../ui/input";
import { CreateProject } from "./ProjectButton";
import ProjectList from "./ProjectList";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Sidebar({projects,project}:{projects:ClientProject[],project:ClientProject|null}) {
  const [search, setSearch] = useState<string>('');
  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()));

  return(
    <div className="flex w-full h-full flex-col p-2 border-l border-r border-gray-200">
      <div className="text-white p-2 space-y-4">
        <div className="relative bg-[#F2F2F2] rounded-sm focus:bg-white focus:border focus:border-[#C4C4C4]">
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-600 left-3 top-1/2 transform -translate-y-1/2" />
          <Input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="text-[#828282] pl-10 focus:text-[#000000]" placeholder="Search"/>
        </div>
        <CreateProject/>
      </div>
      <div className="flex flex-col px-4 py-2 space-y-4">
        <h1 className="text-sm text-gray-400">Eunbin</h1>
        <ProjectList projects={filteredProjects} projectDetail={project}/>
      </div>
    </div>
  )
}