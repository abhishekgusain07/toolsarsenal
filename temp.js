const apiUrl = 'https://oauth.reddit.com/r/cars/new';

const run = async () => {
    const response = await fetch(apiUrl, {
        headers: {
    'Authorization': `bearer ${process.env.REDDIT_ACCESS_TOKEN}`,
            'User-Agent': 'Foreign_Vacation_966'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('making calll ...')
        console.log(data)
    })
        .catch(error => console.error('Error:', error));
}

run()