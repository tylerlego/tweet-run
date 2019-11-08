const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    elapsed_time: {
        type: Number
    },
    distance: {
        type: Number
    },
    timezone: {
        type: String
    },
    utc_offset: {
        type: Number
    },
    type: {
        type: String
    },
    kudos_count: {
        type: Number
    },
    tweets: []
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;