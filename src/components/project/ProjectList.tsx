'use client'
import { ClientProject } from '@/types/Project';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

export default function ProjectList({projects,projectDetail}: {projects: ClientProject[],projectDetail:ClientProject|null}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='w-full flex flex-col space-y-4'>
      {projects.map((project) => {
        const isActive = pathname === `/projects/${project.id}`;
        return (
          <div key={project.id}>
            <button
              onClick={()=>router.push(`/projects/${project.id}`)}
              className={clsx(
                "flex h-[40px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-[#F5F5F5] md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  'bg-[#F5F5F5]': isActive,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={clsx("h-2 w-2", { 'fill-[#00F38D]': isActive, 'fill-gray-400': !isActive })}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              <p>{project.title ? project.title : 'Enter Title Name'}</p>
            </button>
            {isActive && projectDetail?.id === project.id && projectDetail.tasks && (
              projectDetail.tasks.map((task, index) => (
                <div key={index} className='flex items-center py-2 ml-6'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className='fill-black h-1 w-1'
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <p className="text-xs pl-2">{task}</p>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}