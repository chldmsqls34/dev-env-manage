'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { createProject, deleteProject, updateProject } from '@/lib/projectAction';

export function CreateProject() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createProject('Enter Title Here');
      if(result.data){
        router.push(result.data);
      }
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project.');
    }
  }
  return (
    <Button onClick={handleSubmit} className='w-[220px] border-[#E79057] border bg-white text-[#E79057] hover:bg-white'>
      Add New Page
    </Button>

  );
}

export function UpdateProject({ projectId,title,startDate,endDate }: { projectId: string,title:string,startDate:Date|undefined,endDate:Date|undefined }) {


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProject(projectId,title,startDate,endDate);
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project.');
    }
  }
  return (
    <Button onClick={handleSubmit} className='bg-[#E79057] hover:bg-[#E79057]'>
      Save
    </Button>

  );
}

export function DeleteProject({ projectId }: { projectId: string }) {
  const router = useRouter();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(projectId);
      alert('프로젝트가 성공적으로 삭제되었습니다.');
      router.refresh();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('프로젝트 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Button onClick={handleDelete} className='bg-[#E79057] hover:bg-[#E79057] hover:border-[#E26F24] focus:bg-[#AD4500]'>
      Delete Page
    </Button>
  );
}