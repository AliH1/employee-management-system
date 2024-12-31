import employeeMessageModel from '../models/employeeMessage.js';

export const getAllEmployeeMessages = async (req, res) => {
  try {
    const messages = await employeeMessageModel.find();
    return res.status(200).json({
      message: 'Messages fetched successfully',
      messages: messages
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const createEmployeeMessage = async (req, res) => {
  try {
    const { _id, name, email, title, message, date } = req.body;
    console.log("here");
    if (!_id || !name || !email || !title || !message || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    console.log(req.body);
    const idExists = await employeeMessageModel.exists({ _id });
    if (idExists) {
      return res.status(400).json({ message: 'message with this id already exists' });
    }
    if(title.length > 60){
      return res.status(400).json({ message: 'Title should be less than 60 characters' });
    }
    if(message.length > 1000){
      return res.status(400).json({ message: 'Message should be less than 1000 characters' });
    }
    const newMessage = new employeeMessageModel({ _id, name, email, title, message, date });
    await newMessage.save();
  return res.status(201).json({ message: 'Message created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}