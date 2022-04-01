import mongoose from 'mongoose';

const UserSchame = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 5 },
    password: { type: String, required: true, min: 5 },
    fullname: { type: String, required: true },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('Users', UserSchame);
export default UserModel;
