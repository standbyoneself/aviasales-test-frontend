import './style.less';

interface Props {
  title: string;
  className?: string;
  onClick?: () => void;
}

export default function Tab({
  title,
  className = '',
  onClick = () => {},
}: Props) {
  return (
    <p className={`tab ${className}`} onClick={onClick} data-testid='tab'>
      {title}
    </p>
  );
}
