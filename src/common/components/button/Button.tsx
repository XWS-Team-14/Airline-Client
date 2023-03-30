import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  text?: string;
  action?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactElement;
}

const Button = ({ type, text, action, style, children }: ButtonProps) => {
  return (
    <button className={classNames(styles[type])} onClick={action} style={style}>
      <>
        {text}
        {children}
      </>
    </button>
  );
};

export default Button;
