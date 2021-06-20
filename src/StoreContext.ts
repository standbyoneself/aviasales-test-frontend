import { createContext } from 'react';
import HTTPClient from './api/HTTPClient';
import TicketService from './services/TicketService';
import TicketStore from './store/TicketStore';

const ticketService = new TicketService(HTTPClient);
const ticketStore = new TicketStore(ticketService);

const StoreContext = createContext<TicketStore>(ticketStore);

export default StoreContext;
