"use client"
import { ClientProject, ProgressData } from "@/types/Project";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { DeleteProject, UpdateProject } from "./ProjectButton";
import { Progress } from "../ui/progress";
import { CreateTask } from "./task/TaskButton";


export default function ProjectInfo({project,progressData}:{project:ClientProject,progressData:ProgressData}) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    project.project_from ? parseISO(project.project_from) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    project.project_to ? parseISO(project.project_to) : undefined
  );
  const [title, setTitle] = useState<string>(project.title);

  const percentage = progressData.percentage;
  const total = progressData.total;
  const completed = progressData.completed;

  return(
    <div className="w-full h-56">
      <Card className="w-full h-full rounded-none border-none">
        <CardHeader>
          <CardTitle>
            <input type="text" value={title} className="text-4xl pt-12 pb-2 text-gray-700" onChange={(e)=>setTitle(e.target.value)}/>
            <div className="flex space-x-4 items-center">
              <p className="text-sm text-gray-400">{completed}/{total}</p>
              <p className="text-sm text-gray-400">Completed</p>
              <Progress value={percentage} className="w-52"/>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-5 items-center">
            <span>From</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span>To</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <UpdateProject projectId={project.id} title={title} startDate={startDate} endDate={endDate}/>
            <DeleteProject projectId={project.id}/>
            <CreateTask projectId={project.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}