import styled, {  css  } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}
export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 1rem;
  width: 6em;
  margin: 1rem 1rem;
  border-radius: 8px;
  color: #fff;

  background-color: ${props => props.theme["green-500"]};
  
  /* ${props => css `background-color: ${buttonVariants[props.variant]}`}; */
  
`