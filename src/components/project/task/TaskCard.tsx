"use client";

import { CalendarIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { ClientTask } from "@/types/Project";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DeleteTask, UpdateTask } from "./TaskButton";
import { TextButton } from "@/components/ui/TextButton";

const EditorBox = dynamic(() => import('./EditorBox'), {
  ssr: false,
});

export default function TaskCard({task}:{task:ClientTask}) {
  const [title, setTitle] = useState<string>(task.title);
  const [startDate, setStartDate] = useState<Date | undefined>(
    task.task_from ? parseISO(task.task_from) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    task.task_to ? parseISO(task.task_to) : undefined
  );
  const [content, setContent] = useState<string>(task.content||"");
  const [check, setCheck] = useState<boolean|undefined>(task.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const checked = () => setCheck((prev) => !prev);


  return (
    <Card key={task.id}>
    <CardHeader className="flex flex-row space-x-4 items-center">
      <div
        onClick={checked}
        className={cn(
          "w-6 h-6 flex items-center justify-center border rounded-xl cursor-pointer",
          check ? "bg-[#00F38D] text-white" : "border-gray-300 rounded-sm"
        )}
      >
        {check && <CheckIcon className="w-4 h-4" />}
      </div>
      <CardTitle>
        <h1 className="text-2xl text-gray-700">{task.title}</h1>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-row space-x-5 pb-5 items-center">
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
        <div className="grow"></div>
        <TextButton>Duplicate</TextButton>
        <DeleteTask taskId={task.id} />
      </div>
      <div className="flex justify-center pt-5 border-t border-t-gray-200">
        <TextButton onClick={()=>{setIsModalOpen(true);setTitle(task.title);setContent(task.content||"")}}>Add Contents</TextButton>
        {
          isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white w-[70%] h-[80%] p-5 rounded-md">
                <div className="flex flex-col">
                  <div className="flex space-x-4 pb-6 items-center">
                    <div
                      onClick={checked}
                      className={cn(
                        "w-6 h-6 flex items-center justify-center border rounded-xl cursor-pointer",
                        check ? "bg-[#00F38D] text-white" : "border-gray-300 rounded-sm"
                      )}
                    >
                      {check && <CheckIcon className="w-4 h-4" />}
                    </div>
                    <input type="text" value={title} className="text-3xl pt-5" onChange={(e)=>setTitle(e.target.value)}/>
                  </div>
                  <div className="space-x-4">
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
                  </div>
                </div>
                <div className="pt-5">
                  <EditorBox content={content} setContent={setContent}/>
                </div>

                <div className="flex justify-end space-x-4 py-2">
                  <TextButton onClick={()=>{setIsModalOpen(false)}}>Cancle</TextButton>
                  <UpdateTask taskId={task.id} title={title} startDate={startDate} endDate={endDate} content={content} status={check} closeModal={closeModal} />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </CardContent>
  </Card>



  );

}