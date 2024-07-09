import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    password: {
        type: String,
        minLength: 8
    },
    cpassword: {
        type: String,
        minLength: 8
    },
    email: {
        type: String,
        required: true,
        minLength: 6
    },
    dob: {
        type: Date,
        required: true,
    },
    bioText: {
        type: String,
      },
    followers: {
        type: Number,
        default: 0
      },
    following: {
        type: Number,
         default: 0
      },
    decks: {
        deck: {
            deckname: {
                maindeck: [],
                sidedeck: []
            },
        },
    },
    
},{ timestamps: true },);

userSchema.index({username: 1});

export default mongoose.model('User', userSchema);