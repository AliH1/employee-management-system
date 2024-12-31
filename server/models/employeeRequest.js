import mongoose from 'mongoose';

const employeeRequestSchema = new mongoose.Schema({
  _id: { type: String},
  name: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String, enum:{values: ['Update Info', 'Request Time off', 'Terminate Contract', 'Temporary Leave', 'Other'] , message: '{VALUE} not supported'}, required: true },
  message: { type: String, required: true },
  status: { type: String, enum:{values: ['Pending', 'Approved', 'Rejected'], message: '{VALUE} not supported'}, required: true },
  date: { type: Date, required: true }
});

const employeeRequestModel = mongoose.model('EmployeeRequest', employeeRequestSchema);

export default employeeRequestModel;