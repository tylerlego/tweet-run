const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    id: {
        type: Number
    },
    text: {
        type: String
    },
    created_at: {
        type: Date
    },
    source: {
        type: String
    },  
    user_id: {
        type: Number
    },
    user_name: {
        type: String
    },
    user_screen_name: {
        type: String
    },
    user_description: {
        type: String
    },
    user_url: {
        type: String
    },  
    user_profile_background_image_url: {
        type: String
    }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;