const mongoose = require('mongoose')

const Profile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String
    },
    instruments: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    activeBands:[{
        name: {
            type: String,
            required: true
        },
        instruments: {
            type: [String], 
            required: true
        },
        from: {
            type: Date
        },
        genre: {
            type: String
        },
        bandcamp: {
            type: String
        }
    }],
    pastBands: [{
        name: {
            type: String,
            required: true
        },
        instruments: {
            type: String,
        },
        location: {
            type: String
        },
        from: {
            type: Date,
        },
        to: {
            type: Date
        },
        genre: {
            type: String
        }
    }],
    social: {
        bandcamp: {
            type: String
        },
        soundcloud: {
            type: String
        },
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('profile', Profile)