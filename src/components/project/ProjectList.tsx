'use client'
import { ClientProject } from '@/types/Project';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function ProjectList({projects}: {projects: ClientProject[]}) {
  const pathname = usePathname();

  return (
    <>
      {projects.map((project) => {
        const isActive = pathname === `/projects/${project.id}`;
        return (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={clsx(
              "flex h-[40px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-gray-100 text-black-600': isActive,
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
            <p className=''>{project.title? project.title : 'Enter Title Name'}</p>
          </Link>
        );
      })}
    </>
  );
}