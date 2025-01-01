# EMPLOYEE-MANAGEMENT-SYSTEM React Web Application

## Project Description
An employee management system that allows an Adminstory to manage employee information and employee requests. Admins can see and edit/filter employee information via and interacable employee table there also some
bar charts that show information (e.g salary per department). Non admin employees can send requests and admins can approve or reject those requests. There is also a homepage with a company message board. 

## Implementation
If a employee is not login in they will be redirected to the login page. Everyone Employee has an account that is created by an Admin. The first account is Super Admin which will be added directly to DB before running 
the application. This Super Admin can Interact with the frontend to create accounts for all other employees including any other admins. The admin will then provide password to all new employees and then employees can 
login and change there password by interacting with the application. Based on the account type the sidebar of the application will change. Admins can see a list of all employee requests and update there status (approve or 
reject) then employees can see updated request status in the Send Request tab. The Home page has a company message board where employees can post work related messages. There are alerts for create account/change password 
to signal sucess to user and there is a confirmation popup for sending a message/request reminding employees that once sent the message/request can not be undone and should only be work relevant material. 

I decided to use UUID for _id to determine uniqueness of messages/requests/employees instead of letting MongoDB generate ObjectIDS. In this case I just wanted to generate my unique ids in the frontend rather than having to 
fetch ids from mongoDB. Also UUID was needed for employee accounts because although employee emails are unique they can be changed so a uuid is needed to distinguish those employees for update calls when email is updated.   

 ## Technology
 Frontend: React, Typescript, Vite, Material UI <br />
 Backend: Node.js, Express.js, MongoDB, Javascript

## Demo video:

https://github.com/user-attachments/assets/f240d189-b125-4a48-b75c-bff1211ab019


## How to run
1. Clone the repo
2. setup .env but creating a mongoDB cluster and adding the url to your .env file in the server directory 
4. cd into client/server folders respectically ideally in vscode with 2 terminals
5. install packages for both folders ("npm i" in terminal)
6. Create Super admin account using whatever method you want
7. type "npm run dev" in terminal for client and "npm start" in terminal for server
8. Use the app that is running on port 3000

## Things I want to add (in order)
1. Better User authentication (e.g jwt)
2. Add profile images
3. add more functionalities
4. improve UI
