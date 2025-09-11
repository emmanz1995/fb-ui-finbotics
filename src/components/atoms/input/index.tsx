import React, { forwardRef } from 'react';
import {
  InputContainer,
  InputWrapper,
  StyledInput,
  Label,
  IconWrapper,
  ErrorMessage,
} from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth, leftIcon, rightIcon, ...rest }, ref) => {
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            hasError={!!error}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon}
            {...rest}
          />
          {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);
Input.displayName = 'Input';
export default Input;
