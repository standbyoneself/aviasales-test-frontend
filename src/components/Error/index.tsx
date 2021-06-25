import { useContext } from 'react';
import dashaErrorImg from '../../assets/img/dasha-error.png';
import Button from '../../components/Button';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import './style.less';

interface Props {
  statusCode: number;
}

export default function Error({ statusCode }: Props) {
  const ticketStore = useContext(TicketStoreContext);

  return (
    <section className='error'>
      <div className='error__content'>
        <img className='dasha-error' src={dashaErrorImg} />
        <div className='error-details'>
          <p className='error-details__intro'>
            Хьюстон, кажется, у нас проблема...
          </p>
          <p className='error-details__code'>№ {statusCode}</p>
          <Button
            text='Попробовать еще раз'
            onClick={() => ticketStore.getTickets()}
            style={{ marginTop: 40 }}
          />
        </div>
      </div>
    </section>
  );
}
