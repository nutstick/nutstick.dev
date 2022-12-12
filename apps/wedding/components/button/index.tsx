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
        'rounded-xl text-sm font-medium text-white bg-primary',
        'hover:bg-highlighted active:bg-grey-900 focus:outline-none border-4 border-white focus:border-purple-200 transition-all'
      )}
    />
  );
}

export default Button;
