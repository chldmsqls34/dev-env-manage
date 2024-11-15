"use client";
import { ClientProject } from "@/types/Project";
import { Input } from "../ui/input";
import { CreateProject } from "./ProjectButton";
import ProjectList from "./ProjectList";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export default function Sidebar({projects}:{projects:ClientProject[]}) {
  const [search, setSearch] = useState<string>('');
  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()));


  //프로젝트 제목클릭시 해당 프로젝트상세로 이동하며 해당 프로젝트의 하위 작업들을 전부 표시해야함
  return(
    <div className="flex w-full h-full flex-col p-2 border-l border-r border-gray-200 items-center">
      <div className="text-white p-2 space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />
          <Input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="text-black pl-10" placeholder="Search"/>
        </div>
        <CreateProject/>
      </div>
      <div className="w-full px-4 py-2 space-y-4">
        <h1 className="text-sm text-gray-400">Park's</h1>
        <ProjectList projects={filteredProjects}/>
      </div>
    </div>
  )
}