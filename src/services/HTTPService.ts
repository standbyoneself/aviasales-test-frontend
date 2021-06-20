import { HTTPClientType } from '../api/HTTPClient';

export default abstract class HTTPService {
  constructor(protected readonly client: HTTPClientType) {
    this.client = client;
  }
}
