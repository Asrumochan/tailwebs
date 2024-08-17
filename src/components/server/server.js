const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/asru').then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserData = new mongoose.Schema({
    name: { type: String, required: true},
    subject: { type: String, required: true },
    mark: { type: Number, required: true }
  });
  

const User = mongoose.model('User', UserSchema);
const Data = mongoose.model('Data',UserData);


const JWT_SECRET = 'your_jwt_secret';

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

app.get('/datas',async (request , response) => {
    try {
        let datas = await Data.find();
        response.status(200).json(datas);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

app.get('/datas/:id', async (request , response) => {
    try {
        let dataId = request.params.id;
        let data = await Data.findById(dataId);
        response.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

app.post('/datas', async (request , response) => {
    try {
        let newData = {
            name : request.body.name,
            subject : request.body.subject,
            mark : request.body.mark
        };
        // data is Exists or not
        let data = await Data.findOne({
            $and: [
                { subject: newData.subject },
                { name: newData.name }
            ]
        });
        if (data) {
            return res.status(401).json({
                msg: 'Data already exists'
            });
        }
        data = new Data(newData);
        data = await data.save(); // insert the data to database
        response.status(200).json({
            result : 'Data is Created',
            data : data
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});
app.delete('/datas/:id', async (request, response) => {
    try{
        let dataId = request.params.id;
        // data is exists or not
        let data = await Data.findById(dataId);
        if(!data){
            return response.status(401).json({
                msg : 'No Data Found'
            });
        }
        //delete
        data = await Data.findByIdAndDelete(dataId);
        response.status(200).json({
            result : 'Data is Deleted',
            data : data
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});
app.put('/datas/:id', async (request , response) => {
    let dataId = request.params.id;
    try {
        let updatedData = {
            name : request.body.name,
            subject : request.body.subject,
            mark : request.body.mark
        };
        // data is exists or not
        let data = await Data.findById(dataId);
        if(!data){
            return response.status(401).json({
                msg : 'No Data Found'
            });
        }
        // update
        data = await Data.findByIdAndUpdate(dataId , {
            $set : updatedData
        }, { new : true});
        response.status(200).json({
            result : 'Data is Updated',
            data : data
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await User.findOne({ username });
    if (!users) return res.status(400).send('User not found');

    if (users.password !== password) return res.status(400).send('Incorrect password');

    const token = jwt.sign({ id: users.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering users');
  }
});

app.listen(3030, () => {
  console.log('Server is running on http://localhost:3030');
});
