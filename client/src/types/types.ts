export type Employee = {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    dateHired: string;
    salary: number;
    status: string;
}

export interface MessageType {
    name: string;
    title: string;
    message: string;
    date: string;
}

export type User = {
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface RequestType {
    id: number;
    name: string;
    email: string;
    status: string;
    message: string;
    reason: string;
    date: string;
}