Back-end:

```
yarn install
yarn start
```

Front-end:
```
npm install
npm start
```

Enjoy!

KNOWN BUGS:

If token is wrong, tweets will load but activities fail silently. Timezones are not explicitly handled. Server may time-out when attempting to get very old tweets, implement a timer or date range for tweets.