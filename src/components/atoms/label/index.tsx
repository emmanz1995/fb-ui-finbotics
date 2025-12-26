import type { ReactNode, FC } from 'react';

const Label: FC<{ children: ReactNode; name?: string }> = ({
  children,
  name,
}) => {
  return <label htmlFor={name}>{children}</label>;
};

export default Label;
