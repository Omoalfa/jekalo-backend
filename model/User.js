import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    date_of_birth: {
        type: Date
    }
})

export default mongoose.model('User', UserSchema);
