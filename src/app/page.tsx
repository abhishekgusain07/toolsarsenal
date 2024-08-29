'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { YoutubeThumbnail } from './components/YoutubeThumnail'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">YouTube Thumbnail Fetcher</h1>
        <YoutubeThumbnail />
      </main>
    </QueryClientProvider>
  )
}