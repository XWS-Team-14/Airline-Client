import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  text: string;
  action?: () => void;
  style?: React.CSSProperties;
}

const Button = ({ type, text, action, style }: ButtonProps) => {
  return (
    <button className={classNames(styles[type])} onClick={action} style={style}>
      {text}
    </button>
  );
};

export default Button;
