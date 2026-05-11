import axios from 'axios';
import { APIUser } from '@/types';

const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });

export async function fetchAPIUsers(): Promise<APIUser[]> {
  const { data } = await api.get<APIUser[]>('/users');
  return data;
}

export async function fetchAPIUserById(id: number): Promise<APIUser> {
  const { data } = await api.get<APIUser>(`/users/${id}`);
  return data;
}
