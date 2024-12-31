import employeeModel from '../models/employee.js';
import bcrypt from 'bcryptjs';

export const registerEmployee = async (req, res) => {
  try{
    const {_id , name, email, password, phoneNumber, position, department, startDate, salary, status, isAdmin} = req.body;
    if(!_id|| !name || !email || !password || !phoneNumber || !position || !department || !startDate || !salary || !status || isAdmin === undefined){
      return res.status(400).json({ message: 'Please provide all fields'});
    }
    const userExists = await employeeModel.findOne({ email: email });
    if(userExists){
      return res.status(400).json({ message: 'Account with this email already exists' });
    }
    const idExists = await employeeModel.findOne({ _id: _id });
    if(idExists){
      return res.status(400).json({ message: 'Account with this ID already exists' });
    }
    if(isAdmin !== true && isAdmin !== false){
      return res.status(400).json({ message: 'Invalid isAdmin value' });
    }
    if(status !== 'Active' && status !== 'Inactive' && status !== 'Terminated'){
      return res.status(400).json({ message: 'Invalid status' });
    }
    if(password.length < 8) {
      res.status(400);
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newEmployee = new employeeModel({
      _id,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      position,
      department,
      startDate,
      salary,
      status,
      isAdmin
    });
    await newEmployee.save();
    return res.status(201).json({ message: 'Employee registered successfully' });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEmployees = async (req, res) => {
  try{
    const employees = await employeeModel.find();
    return res.status(200).json({
      message: 'Employees fetched successfully',
      employees: employees
    });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const changePassword = async (req, res) => {
  try {
    const {email, currentPassword, password} = req.body;
    if(!email || !password){
      return res.status(400).json({ message: 'Please provide all fields' });
    }
    const user = await employeeModel.findOne({ email: email });
    if(!user){
      return res.status(400).json({ message: 'Invalid email or current password does not match' });
    }
    if(password.length < 8) {
      res.status(400);
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if(currentPassword === password){
      return res.status(400).json({ message: 'New password cannot be the same as the current password' });
    }
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if(!validPassword){
      return res.status(400).json({ message: 'Invalid email or current password does not match' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const update = await employeeModel.updateOne({ email: email }, { $set: { password: hashedPassword } });
    if(!update){
      return res.status(400).json({ message: 'Password not updated'});
    }
    return res.status(200).json({ message: 'Password changed successfully' });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const updateEmployee = async (req, res) => {
  try{
    const {_id, name, email, phoneNumber, position, department, startDate, salary, status} = req.body;
    if(!name || !email || !phoneNumber || !position || !department || !startDate || !salary || !status){
      return res.status(400).json({ message: 'Please provide all fields'});
    }
    const emailExists = await employeeModel.findOne({email: email});
    if(emailExists && emailExists._id.toString() !== _id ) {
      return res.status(400).json({ message: 'employee with this email already exists'});
    }
    if(status !== 'Active' && status !== 'Inactive' && status !== 'Terminated'){
      return res.status(400).json({ message: 'Invalid status' });
    }
    const update = await employeeModel.updateOne({ _id: _id},
      {$set: {name: name, email: email, phoneNumber: phoneNumber, position: position, department: department, startDate: startDate, salary: salary, status: status}});
      if(!update){
      return res.status(400).json({ message: 'Employee not updated' });
    }
    return res.status(200).json({ message: 'Employee updated successfully' });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const checkLoginCredentials = async (req, res) => {
  try{
    const {email, password} = req.body;
    const user = await employeeModel.findOne({ email: email });
    if(!user){
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({user: user, message: 'Login successful'});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}