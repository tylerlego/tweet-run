const router = require('express').Router();
const request = require('request');
const querystring = require('querystring');

router.route('/').get((req, res) => {
  console.log("IN AUTH");
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'production') {
    res.redirect("https://www.google.com");
  } else {
    let redirect_uri = "http://" + req.headers.host +  
    process.env.STRAVA_AUTH_REDIRECT_URI;

    res.json('http://www.strava.com/oauth/authorize?' + 
    querystring.stringify({
    response_type: 'code',
    client_id: process.env.STRAVA_CLIENT_ID,
    scope: process.env.STRAVA_SCOPE,
    approval_prompt: process.env.APPROVAL_PROMPT,
    redirect_uri 
    }))
  }

  

  
}); 

router.route('/callback').get((req, res) => {
  let code = req.query.code || null;
  let redirect_uri = "http://" + req.headers.host +  
                     process.env.STRAVA_AUTH_REDIRECT_URI;

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
    console.log(req);

    res.redirect(req.headers.referer + "?t=" + access_token);
  })

  
})

 
module.exports = router;