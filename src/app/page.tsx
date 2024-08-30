'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { YoutubeThumbnail } from './components/YoutubeThumnail'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <YoutubeThumbnail />
    </QueryClientProvider>
  )
}