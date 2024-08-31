import axios from 'axios';
import axiosRetry from 'axios-retry';
import { type NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.REDDIT_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Reddit API is working' });
}

export async function POST(request: NextRequest) {
    const { author } = await request.json();
    console.log(author)
    try {
        const baseUrl = `https://oauth.reddit.com/user/${author}`;
        const client = axios.create({baseURL: baseUrl, headers: {
            'Authorization': `bearer ${API_KEY}`,
            'User-Agent': 'Foreign_Vacation_966'
        }})
        axiosRetry(client, {retries: 5, retryDelay: (retryCount: number) => retryCount * 1000})
        console.log(baseUrl)
        const response = await client.get('/about');
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error:');
        return NextResponse.json({ error: 'Error fetching from Reddit API' }, { status: 500 });
    }
}