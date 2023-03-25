import Ticket from "./Ticket";

export default interface User {
    first_name: string;
    last_name: string;
    email: string;
    date_joined: Date;
    last_login: Date;
    is_active: boolean;
    tickets : Ticket[];
}