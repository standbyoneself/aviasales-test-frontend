import { createContext } from 'react';
import ticketStore, { TicketStore } from '../store/TicketStore';

const TicketStoreContext = createContext<TicketStore>(ticketStore);

export default TicketStoreContext;
