import './style.less';

interface Props {
  title: string;
  text: string;
}

export default function TicketDetailsItem({ title, text }: Props) {
  return (
    <div className='ticket-details-item' data-testid='ticket-details-item'>
      <p
        className='ticket-details-item__text--gray'
        data-testid='ticket-details-item-title'
      >
        {title}
      </p>
      <p
        className='ticket-details-item__text'
        data-testid='ticket-details-item-text'
      >
        {text}
      </p>
    </div>
  );
}
