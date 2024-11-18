import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SecondaryButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'px-3 py-1.5 gap-2 rounded-md border text-sm text-[#E79057] border-[#E79057] hover:bg-[#FFF9F5] hover:border-[#E79057] active:text-[#AD4500] active:bg-[#FFF9F5] active:border-[#E79057] focus:text-[#AD4500] focus:bg-[#FFC097] focus:border-[#E79057]',
        className,
      )}
    >
      {children}
    </button>
  );
}
