const router = require('express').Router();
const request = require('request');
const moment = require('moment');
const Activity = require('../models/activity.model');

router.route('/').get((req,res) => {  
    let token = req.query.t || null
  
    var options = {
      url: 'https://www.strava.com/api/v3/athlete/activities?per_page=10',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
     
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        let activities = [];
  
        for (let i = 0; i < data.length; i++) {
          const activity = new Activity({
            name: data[i].name,
            start_date: data[i].start_date,
            end_date: calculateEndDate(data[i].start_date, data[i].elapsed_time),
            elapsed_time: data[i].elapsed_time,
            distance: data[i].distance,
            timezone: data[i].timezone,
            utc_offset: data[i].utc_offset,
            type: data[i].type,
            kudos_count: data[i].kudos_count
          });
  
          activities.push(activity);
        } 
  
        JSON.stringify(activities);
        res.json(activities);
      } else {
        console.log(error);
      }
    }
     
    request(options, callback); 
    
});

function calculateEndDate(start_date, elapsed_time) {
  return moment(start_date).add(elapsed_time, 'seconds');
}

module.exports = router;
