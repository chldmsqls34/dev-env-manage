import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FilledButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'h-9 px-3 py-1.5 gap-2 text-sm text-white rounded-md bg-[#E79057] hover:border hover:border-[#E26F24] active:bg-[#E26F24] focus:bg-[#AD4500]',
        className,
      )}
    >
      {children}
    </button>
  );
}