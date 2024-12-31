import{ Dayjs } from "dayjs";

export interface Employee {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    position: string;
    department: string;
    startDate: Date;
    salary: number;
    status: string;
}

export interface MessageType {
    _id: string;
    email: string;
    name: string;
    title: string;
    message: string;
    date: Dayjs;
}

export interface User {
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface EmployeeUser extends Employee, User {
    password: string;
}

export interface RequestType {
    _id: string;
    name: string;
    email: string;
    status: string;
    message: string;
    reason: string;
    date: Dayjs;
}

export interface LoginType {
    email: string;
    password: string;
}

export interface ChangePasswordType {
    email: string;
    password: string;
    currentPassword: string;
}

export interface UpdateStatus {
    _id: string;
    status: string;
}