export type Employee = {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    dateHired: Date;
    salary: number;
    status: string;
}

export interface message {
    id: number;
    name: string;
    title: string;
    message: string;
    date: Date;
}

export interface adminMessage extends message {
    email: string;
}

export type User = {
    name: string;
    email: string;
    isAdmin: boolean;
}
