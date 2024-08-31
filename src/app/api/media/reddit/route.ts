import axios from 'axios';
import axiosRetry from 'axios-retry';
import { type NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.REDDIT_ACCESS_TOKEN;

function extractRedditPath(url: string): string | null {
    const redditPrefix = 'www.reddit.com';
    
    try {
      const parsedUrl = new URL(url);
      
      if (parsedUrl.hostname === redditPrefix) {
        return parsedUrl.pathname.slice(1); // Remove leading '/'
      }
      
      return null; // Not a Reddit URL
    } catch (error) {
      return null; // Invalid URL
    }
  }

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Reddit API is working' });
}

export async function POST(request: NextRequest) {
    const { RedditUrl } = await request.json();
    const content = extractRedditPath(RedditUrl);

    if (!content) {
        return NextResponse.json({ error: 'No content found' }, { status: 404 });
    }
    try {
        const baseUrl = 'https://oauth.reddit.com';
        const client = axios.create({baseURL: baseUrl, headers: {
            'Authorization': `bearer ${API_KEY}`,
            'User-Agent': 'Foreign_Vacation_966'
        }})
        axiosRetry(client, {retries: 5, retryDelay: (retryCount: number) => retryCount * 1000})

        const response = await client.get(`/${content}`);
        console.log(response.data)
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error:');
        return NextResponse.json({ error: 'Error fetching from Reddit API' }, { status: 500 });
    }
}