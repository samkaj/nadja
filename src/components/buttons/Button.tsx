import { IconType } from "react-icons";
import "./button.css";

type ButtonProps = {
  Icon?: IconType;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  Icon,
  onClick,
  className,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <button className={className} onClick={onClick}>
    {Icon && <Icon className="white-fill" />}
    {children}
  </button>
);

export const PrimaryButton = ({
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <button onClick={onClick} className="primary">
    {children}
  </button>
);

export const SecondaryButton = ({
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <button onClick={onClick} className="secondary">
    {children}
  </button>
);

export const TertiaryButton = ({
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <button onClick={onClick} className="tertiary">
    {children}
  </button>
);

export const LinkButton = ({
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => (
  <button onClick={onClick} className="clean">
    {children}
  </button>
);

export default Button;
