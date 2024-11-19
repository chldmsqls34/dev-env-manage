'use client';

import { FilledButton } from '@/components/ui/FilledButton';
import { TextButton } from '@/components/ui/TextButton';
import { createTask, deleteTask, updateTask } from '@/lib/taskAction';
import { useRouter } from 'next/navigation';

export function CreateTask({projectId}: {projectId: string}) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask(projectId);
      
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  }
  return (
    <FilledButton onClick={handleSubmit}>
      Add New
    </FilledButton>
  );
}

export function CreateTaskWithSecondaryButton({ projectId }: { projectId: string }) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask(projectId);
      
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  }
  return (
    <button onClick={handleSubmit}>
      <div className="group inline-block">
        <svg
          width="74"
          height="74"
          viewBox="0 0 74 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current text-[#E79057] group-active:text-[#AD4500] transition-colors duration-200"
        >
          <circle cx="37" cy="37" r="36.5" />
          <line x1="21" y1="36.5" x2="53" y2="36.5" />
          <line x1="37.5" y1="21" x2="37.5" y2="53" />
        </svg>
      </div>
    </button>
  );
}

export function UpdateTask({ taskId,title,startDate,endDate,content,status,closeModal }: { taskId: string,title:string,startDate:Date|undefined,endDate:Date|undefined,content:string,status:boolean|undefined,closeModal:()=>void }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateTask(taskId,title,startDate,endDate,content,status);
      if(result.message){
        closeModal();
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  }
  return (
    <FilledButton onClick={handleSubmit}>
      Done
    </FilledButton>
  );
}

export function DeleteTask({ taskId }: { taskId: string }) {
  const router = useRouter();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = window.confirm('정말로 이 작업을 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }
    try {
      const result = await deleteTask(taskId);
      if(result.message){
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('작업 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <TextButton onClick={handleDelete}>
      Delete
    </TextButton>
  );
}