import { CSSProperties } from 'react';
import './style.less';

interface Props {
  text: string;
  onClick: () => any;
  style?: CSSProperties;
}

export default function Button({ text, onClick, style }: Props) {
  return (
    <button className='button' onClick={onClick} style={style && style}>
      {text}
    </button>
  );
}
