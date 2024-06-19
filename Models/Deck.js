import mongoose from 'mongoose';

const deckSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    deckname: {
        type: String,
        // required: true
    },
    deck: { // nested document
        maindeck: [],
        sidedeck: []
    },
    
},
 {timestamps: true});



export default mongoose.model('Deck', deckSchema);