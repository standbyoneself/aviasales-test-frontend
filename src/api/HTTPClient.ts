import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../constants';

const options: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const HTTPClient: AxiosInstance = axios.create(options);

export type HTTPClientType = typeof HTTPClient;

export default HTTPClient;
