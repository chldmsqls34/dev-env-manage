"use client"
import { ClientTask } from "@/types/Project";
import TaskCard from "./TaskCard";


export default function TaskList({tasks}:{tasks:ClientTask[]}) {

  return(
    <div className="w-full h-full px-6 py-4 space-y-4 bg-gray-100 overflow-y-auto">
      {tasks.map((task) => {
        return (
          <TaskCard key={task.id} task={task}/>
        )
      })}
    </div>
  )
}