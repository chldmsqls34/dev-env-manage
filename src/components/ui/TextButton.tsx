import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TextButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'h-9 px-3 py-1.5 gap-2 rounded-md text-sm text-[#6D6D6D] hover:bg-[#F6F6F6] active:bg-[#F0F0F0] active:text-[#000000] active:border active:border-[#D2D2D2] focus:text-[#000000] focus:border focus:border-[#5F5F5F]',
        className,
      )}
    >
      {children}
    </button>
  );
}
