import { Input } from "./input";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  return <input type="password" className={className} {...props} />;
};
