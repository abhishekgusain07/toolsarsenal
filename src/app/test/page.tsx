'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CursoredData, Tweet } from "rettiwt-api"

const TestPage = () => {
    const [tweets, setTweets] = useState<CursoredData<Tweet>>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchTweets = async () => {
            setIsLoading(true)
            const res = await fetch('/api/media/twitterSearch')
            const data = await res.json()
            setTweets(data)
            console.log(data)
            setIsLoading(false)
        }
        fetchTweets()
    }, [])
    const LikePost = async () => {
        try {
            const res = await fetch('/api/media/tweetSchedule')
            const data = await res.json()
            console.log(data)
            toast.success('Tweet Liked Successfully')
        } catch (error) {
            toast.error('Error Liking tweet')
        }
    }
    const router = useRouter()
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            {
                tweets?.list.map((tweet: Tweet) => (
                    <div key={tweet.id} className="mb-4 mt-1 px-8 w-full">
                        {tweet.fullText}
                        <span className="text-sm text-gray-500 flex cursor-pointer" onClick={() => {
                            window.open(`https://x.com/${tweet.tweetBy.userName}`, '_blank', 'noopener,noreferrer')
                        }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.push(`https://x.com/${tweet.tweetBy.userName}`)
                                }
                            }}
                        >@{tweet.tweetBy.userName}</span>
                    </div>
                ))
            }
            {/* <div className="flex justify-center items-center mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={LikePost}
                >Schedule</button>
            </div> */}
        </div>
    )
}

export default TestPage