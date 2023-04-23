import { IconType } from "react-icons";
import "./button.scss";

type ButtonProps = {
  Icon?: IconType;
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  Icon,
  onClick,
  className,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <button type="submit" className={className} onClick={onClick}>
    {Icon && <Icon className="white-fill" />}
    {children}
  </button>
);

export const PrimaryButton = ({
  Icon,
  onClick,
  children,
  className,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <Button Icon={Icon} onClick={onClick} className={`primary ${className}`}>
    {children}
  </Button>
);

export const SecondaryButton = ({
  onClick,
  children,
  className,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <Button onClick={onClick} className={`secondary ${className}`}>
    {children}
  </Button>
);

export const TertiaryButton = ({
  onClick,
  children,
  className,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <Button onClick={onClick} className={`tertiary ${className}`}>
    {children}
  </Button>
);

export const LinkButton = ({
  onClick,
  children,
  className,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <Button onClick={onClick} className={`clean ${className}`}>
    {children}
  </Button>
);

export default Button;
