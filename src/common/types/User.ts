import Ticket from './Ticket';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  date_joined: Date;
  last_login: Date;
  is_active: boolean;
  tickets: Ticket[];
}

export type { User, UserDetails };
