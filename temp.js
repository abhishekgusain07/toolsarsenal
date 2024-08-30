const API_KEY = 'AIzaSyCUeBH_NRTDCk6hl6wlnQGtoNfjm3_hlxw';
const VIDEO_URL = 'https://youtu.be/nToFz87NdyE?si=i3bTV4UvoCsgWBnY'; // Replace with any YouTube video URL

function extractVideoId(url) {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
    }
    return urlObj.searchParams.get('v');
}

const VIDEO_ID = extractVideoId(VIDEO_URL);

const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,player&id=${VIDEO_ID}&key=${API_KEY}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            const video = data.items[0];
            console.log(`Title: ${video.snippet.title}`);
            console.log(`Views: ${video.statistics.viewCount}`);
            console.log(`Likes: ${video.statistics.likeCount}`);
            console.log(`Comments: ${video.statistics.commentCount}`);
            console.log('Thumbnails:');
            Object.entries(video.snippet.thumbnails).map(([key, thumb]) => {
                console.log(`  ${key}: ${thumb.url} (${thumb.width}x${thumb.height})`);
            });
            console.log(`Embed HTML: ${video.player.embedHtml}`);
        } else {
            console.log('Video not found');
        }
    })
    .catch(error => console.error('Error:', error));