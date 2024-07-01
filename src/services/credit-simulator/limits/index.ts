import http from '@/http';
import { AxiosResponse } from 'axios';

export const getLimits = async () => {
  return await http.get('/limits') as AxiosResponse<Limit>
}