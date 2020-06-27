import { PhoneBookEntry } from './phonebookentry';

export interface PhoneBook {
    id: string;
    name: string;
    entries: PhoneBookEntry[];
}