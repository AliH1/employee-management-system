import dayjs, { Dayjs} from 'dayjs';

const date: Dayjs = dayjs();


export const List = [
  {id: 1, name: 'John Doe', email: 'Jhon@gmail.com',  status: 'Pending', message: 'would like to request 1 week off for vacation', reason: 'Request Time off', date: date},
  {id: 2, name: 'Jane Doe', email: 'jane@gmail.com', status: 'Pending', message: 'Would like to terminate my contract ', reason: 'Terminate Contract', date: date},
  {id: 3, name: 'Jaime Doe', email: 'jaime@gmail.com', status: 'Approved', message: 'Would like to request a temporary leave for a month inorder to deal with family issues', reason: 'Temporary Leave', date: date},
  {id: 4, name: 'Jock Doe', email: 'jock@gmail.com', status: 'Rejected', message: 'Update my email to User44@gmail.com', reason: 'Update Info', date: date},
  {id: 5, name: 'Harry Doe', email: 'harry@gmail.com', status: 'Pending', message: 'Request for a raise, its been a while since I have gotten a raise nad feel like I deserve one.', reason: 'Other', date: date}];
