
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GhostButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'h-9 px-3 py-1.5 gap-2 rounded-md text-sm text-[#939393] bg-[#F6F6F6] hover:bg-[#E7E7E7] active:text-[#454545] active:bg-[#E7E7E7] active:border-t active:border-transparent focus:text-[#000000] focus:bg-[#F6F6F6] focus:border-t focus:border-transparent',
        className,
      )}
    >
      {children}
    </button>
  );
}

