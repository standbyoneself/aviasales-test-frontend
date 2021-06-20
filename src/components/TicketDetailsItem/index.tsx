import './style.less';

interface Props {
  title: string;
  text: string;
}

export default function TicketDetailsItem({ title, text }: Props) {
  return (
    <div className='ticket-details-item'>
      <p className='ticket-details-item__text--gray'>{title}</p>
      <p className='ticket-details-item__text'>{text}</p>
    </div>
  );
}
