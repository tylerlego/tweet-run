const router = require('express').Router();
const querystring = require('querystring');

let redirect_uri = process.env.STRAVA_AUTH_REDIRECT_URI;

router.route('/').get((req, res) => {
  res.json('http://www.strava.com/oauth/authorize?' + 
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.STRAVA_CLIENT_ID,
    scope: process.env.STRAVA_SCOPE,
    approval_prompt: process.env.APPROVAL_PROMPT,
    redirect_uri 
  })) 
}); 

router.route('/callback').get((req, res) => {
  res.json({"CALLBACK": "true"}); 
});

 
module.exports = router;