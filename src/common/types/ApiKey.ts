import { User } from './User';

export interface ApiKey {
  value: string;
  validityInDays: number;
  user: User;
}
