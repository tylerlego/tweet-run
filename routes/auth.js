const router = require('express').Router();
const request = require('request');
const querystring = require('querystring');
const ENV = process.env.NODE_ENV;

router.route('/').get((req, res) => {
  
  let redirect_uri = ENV === 'production' ? 
                      process.env.FRONTEND_BASE_PROD + process.env.STRAVA_AUTH_REDIRECT_URI :
                      "http://" + req.headers.host + process.env.STRAVA_AUTH_REDIRECT_URI;

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
  let code = req.query.code || null;

  let redirect_uri = ENV === 'production' ? 
                      process.env.FRONTEND_BASE_PROD + process.env.STRAVA_AUTH_REDIRECT_URI :
                      "http://" + req.headers.host + process.env.STRAVA_AUTH_REDIRECT_URI;

  let stravaAuthOptions = {
    url: 'https://www.strava.com/oauth/token',
    form: {
      code: code,
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    json: true 
  }
  let data = {};
  request.post(stravaAuthOptions, function(error, response, body) {
    data = {
      token_type: body.token_type,
      expires_at: body.expires_at,
      expires_in: body.expires_in,
      refresh_token: body.refresh_token, 
      access_token: body.access_token,
      athlete: body.athlete
    }

    var access_token = data.access_token;

    let finish = ENV === 'production' ? 
                  process.env.FRONTEND_BASE_PROD + "?t=" + access_token :
                  process.env.FRONTEND_BASE_DEV + "?t=" + access_token;

    res.redirect(finish);
  })  
})

module.exports = router;