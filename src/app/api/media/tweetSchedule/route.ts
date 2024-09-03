import { type NextRequest, NextResponse } from "next/server";
import { EResourceType, FetcherService, Rettiwt } from "rettiwt-api";

export async function GET(request: NextRequest) {
    try {
        console.log('fetching tweets')
        const rettiwt = new Rettiwt({ apiKey: process.env.RETTIWT_API_KEY_2 });
        const result = await rettiwt.tweet.like('1830693069244768662')
        return NextResponse.json(result);
    } catch (error) {
        console.log('error occured during fetching tweets')
        return NextResponse.json({ error }, { status: 500 });
    }
}
