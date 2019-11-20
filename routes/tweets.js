const router = require('express').Router();
const Twit = require('twit');
const Tweet = require('../models/tweet.model');

router.route('/').get((req,res) => {  
  getStatuses(req, res);
});

router.route('/:id').get((req,res) => {
  getStatuses(req, res);
});

function getStatuses(req, res, count) {
  const T = new Twit({
    consumer_key:         process.env.TWITTER_API_KEY,
    consumer_secret:      process.env.TWITTER_API_SECRET_KEY,
    app_only_auth:        true
  })
  const TWEET_COUNT = 200;
  const TWITTER_SCREEN_NAME = 'realDonaldTrump';

  let options = {
    screen_name: TWITTER_SCREEN_NAME,
    count: TWEET_COUNT
  }

  if (req.params.id != 0) {
    options.max_id = req.params.id;
  }
  
  let tweets = [];

  T.get('statuses/user_timeline', options,  function (err, data, response) {
    for (let i = 0; i < data.length; i++) {
      const tweet = new Tweet({
        id: data[i].id,
        text: data[i].text,
        created_at: data[i].created_at,
        source: data[i].source,
        useer_id: data[i].user.id,
        user_name: data[i].user.name,
        user_screen_name: data[i].user.screen_name,
        user_description: data[i].user.description,
        user_url: data[i].user.url,
        user_profile_background_image_url: data[i].user.profile_background_image_url,
        urls: data[i].entities.urls
      });

      tweets.push(tweet);
    }

    if (tweets.length < 50) {
      getStatuses(req, res);
    } else {
      res.json(tweets); 
    }    
  })
}

module.exports = router;
