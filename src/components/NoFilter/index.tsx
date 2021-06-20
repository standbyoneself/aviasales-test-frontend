import dashaFilterImg from '../../assets/img/dasha-filter.png';
import './style.less';

export default function NoFilter() {
  return (
    <div className='no-filter'>
      <div className='no-filter__text-container'>
        <p className='no-filter__text'>Даша поможет тебе выбрать фильтры,</p>
        <p className='no-filter__text no-filter__text--right'>
          И совсем скоро ты отправишься{' '}
          <span className='no-filter__text no-filter__text--blue'>
            в путешествие!
          </span>
        </p>
      </div>
      <img src={dashaFilterImg} className='dasha-filter' />
    </div>
  );
}
