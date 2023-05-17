import type {
  CSSProperties,
  MouseEventHandler,
  // ReactEventHandler,
  ReactNode,
} from "react";

const Button: React.FC<{
  style?: CSSProperties | undefined;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ style, children, className, onClick }) => {
  return (
    <div style={style} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
