import employeeRequestModel from '../models/employeeRequest.js';


export const getAllEmployeeRequests = async (req, res) => {
  try{
    const requests = await employeeRequestModel.find();
    return res.status(200).json({
      message: 'Requests fetched successfully',
      requests: requests
    });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const createEmployeeRequest = async (req, res) => {
  try{
    const {_id, name, email, reason, message, status, date} = req.body;
    if(!_id || !name || !email || !reason || !message || !status || !date){
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const idExists = await employeeRequestModel.exists({_id});
    if(idExists){
      return res.status(400).json({ message: 'Employee with this id already exists' });
    }
    if(reason !== 'Update Info' && reason !== 'Request Time off' && reason !== 'Terminate Contract' && reason !== 'Temporary Leave' && reason !== 'Other'){
      return res.status(400).json({ message: 'Invalid reason' });
    }
    if(status !== 'Pending' && status !== 'Approved' && status !== 'Rejected'){
      return res.status(400).json({ message: 'Invalid status' });
    }
    const newRequest = new employeeRequestModel({_id, name, email, reason, message, status, date});
    await newRequest.save();
    return res.status(201).json({ message: 'Employee request created successfully' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const updateEmployeeRequest = async (req, res) => {
  try{
    const {_id, status} = req.body;
    if(!_id || !status){
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if(status !== 'Pending' && status !== 'Approved' && status !== 'Rejected'){
      return res.status(400).json({ message: 'Invalid status' });
    }
    const employeeRequest = await employeeRequestModel.findOne({_id});
    if(!employeeRequest){
      return res.status(404).json({ message: 'Employee request not found' });
    }
    employeeRequest.status = status;
    await employeeRequest.save();
    return res.status(200).json({ message: 'Employee request updated successfully' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const getEmployeeRequests = async (req, res) => {
  try{
    const {email} = req.headers;
    if(!email){
      return res.status(400).json({ message: 'Please provide all fields' });
    }
    const requests = await employeeRequestModel.find({email});
    return res.status(200).json({
      message: 'Requests fetched successfully',
      requests: requests
    });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}