import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import employeeRouter from './routes/employeeRoutes.js';
import employeeMessageRouter from './routes/employeeMessageRoutes.js';
import employeeRequestRouter from './routes/employeeRequestRoutes.js';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());


//Connect to DB
dotenv.config();
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
//test connection
db.on('error', (error) => console.error(error));
db.once('connected', () => console.log('Connected to Database'));

export default db;


//routes
app.use('/api/employee', employeeRouter);
app.use('/api/employeeMessage', employeeMessageRouter);
app.use('/api/employeeRequest', employeeRequestRouter);
// Start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});