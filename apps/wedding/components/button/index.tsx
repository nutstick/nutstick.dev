import { Button as AriaKitButton, ButtonProps } from 'ariakit/button';
import clsx from 'clsx';

interface Props extends ButtonProps {}

function Button({ className, ...props }: Props) {
  return (
    <AriaKitButton
      {...props}
      className={clsx(
        className,
        'px-5 py-3',
        'bg-primary rounded-xl text-sm font-medium text-white',
        'hover:bg-highlighted active:bg-grey-900 border-4 border-white transition-all focus:border-purple-200 focus:outline-none'
      )}
    />
  );
}

export default Button;
