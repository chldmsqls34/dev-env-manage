'use client';

import { FilledButton } from '@/components/ui/FilledButton';
import { TextButton } from '@/components/ui/TextButton';
import { createTask, deleteTask, updateTask } from '@/lib/taskAction';
import { useRouter } from 'next/navigation';

export function CreateTask({projectId}: {projectId: string}) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask(projectId,'Enter Title Here');
      
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