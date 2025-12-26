import type { FC } from 'react';

const Select: FC<{ options: { value: string; label: string }[] }> = ({
  options,
}) => {
  return (
    <select>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
