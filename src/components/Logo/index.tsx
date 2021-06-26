import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import earth from '../../assets/img/earth.svg';
import { ReactComponent as Plane } from '../../assets/img/plane.svg';
import TicketStoreContext from '../../contexts/TicketStoreContext';
import './style.less';

export default observer(function Logo() {
  const ticketStore = useContext(TicketStoreContext);

  return (
    <div className='logo'>
      {/* Using object because of render bug in Safari */}
      <object data={earth} type='image/svg+xml'></object>
      <div
        className={`plane-container ${ticketStore.isLoading && 'animate'}`}
        data-testid='plane-container'
      >
        <Plane className='plane' />
      </div>
    </div>
  );
});
