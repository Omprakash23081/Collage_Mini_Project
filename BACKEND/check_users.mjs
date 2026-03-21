import mongoose from 'mongoose';
import User from './src/models/user.model.js';
import dotenv from 'dotenv';
import { DB_NAME } from './src/constants.js';

dotenv.config();

mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`).then(async () => {
    const users = await User.find({});
    users.forEach(u => console.log(`User ID: ${u._id} | Email: ${u.email} | ProfileImage: ${u.profileImage}`));
    mongoose.disconnect();
}).catch(console.error);
