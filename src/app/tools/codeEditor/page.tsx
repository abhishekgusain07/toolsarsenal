'use client'

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Page = () => {
    const[loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        router.replace('https://code-recoded.vercel.app')
        setLoading(false);
    }, [router])

    if (loading) return (
        <div className="flex flex-col h-full justify-center items-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Redirecting to Code Editor...</p>
        </div>
    )
    return null;
}

export default Page;