const { Rettiwt } = require("rettiwt-api");

// Creating a new Rettiwt instance
const rettiwt = new Rettiwt({ apiKey: process.env.RETTIWT_API_KEY });





// Logging in an getting the API_KEY
rettiwt.tweet.details('1830246230913433633')
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
});