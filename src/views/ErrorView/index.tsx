import dashaErrorImg from '../../assets/img/dasha-error.png';
import Button from '../../components/Button';
import './style.less';

interface Props {
  statusCode: number;
}

export default function ErrorView({ statusCode }: Props) {
  return (
    <section className='error-view'>
      <div className='error-view__content'>
        <img className='dasha-error' src={dashaErrorImg} />
        <div className='error-details'>
          <p className='error-details__intro'>
            Хьюстон, кажется, у нас проблема...
          </p>
          <p className='error-details__code'>№ {statusCode}</p>
          <Button
            text='Обновить страницу'
            onClick={() => window.location.reload()}
            style={{ marginTop: 40 }}
          />
        </div>
      </div>
    </section>
  );
}
