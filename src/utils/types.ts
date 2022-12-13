
import { Record,Admin } from 'pocketbase';

interface LoginUser {
  message: string;
  email: string;
  token: string;
  status: number;
}
export type User = LoginUser | null;
