import mongoose from 'mongoose';
import { profileSchema } from './Profile.js';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 60
    },
    dob: {
        type: Date,
        required: true,
    },
    bioText: profileSchema,
    followers: profileSchema,
    following: profileSchema
});

userSchema.index({username: 1});

export default mongoose.model('User', userSchema);