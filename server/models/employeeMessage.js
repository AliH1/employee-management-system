import mongoose from 'mongoose';

const employeeMessageSchema = new mongoose.Schema({
  _id: { type: String},
  name: { type: String, required: true },
  email: { type: String, required: true},
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true }
});

const employeeMessageModel = mongoose.model('EmployeeMessage', employeeMessageSchema);

export default employeeMessageModel;