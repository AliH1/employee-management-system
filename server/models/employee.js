import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  _id: { type: String},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  startDate: { type: Date, required: true },
  salary: { type: Number, required: true },
  status: { type: String, enum: {values: ['Active', 'Inactive', 'Terminated'], message: '{VALUE} not supported'}, required: true },
  isAdmin: { type: Boolean, required: true }
});

const employeeModel = mongoose.model('Employee', employeeSchema);

export default employeeModel;