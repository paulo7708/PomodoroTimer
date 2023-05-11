import { ButtonContainer, ButtonVariant } from "./Button.style";

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button = ({ variant = "primary" }: ButtonProps) => {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
};
