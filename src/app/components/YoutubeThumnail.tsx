'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"

type ActiveTabs = 'Settings' | 'Edit' | 'Background';

export function YoutubeThumbnail() {
  const [VideoUrl, setVideoUrl] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)


  return (
        <div id="maindiv" className="flex flex-col sm:flex-row  overflow-auto bg-[#f5f5f5] dark:bg-[#141414]" style={{minHeight:"calc(-56px + 100vh);"}}>
          <ThumbnailComponent />
          <EditorSidebar text="Made By John 🔥" />
        </div>
  )
}


const ThumbnailComponent = () => {
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkStyle, setWatermarkStyle] = useState('dark');
  const [watermarkText, setWatermarkText] = useState('Picyard');
  const [showWaterMarkOptions, setShowWaterMarkOptions] = useState(false)
  const [url, setUrl] = useState<string>('')

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (videoUrl: string) => {
      const response = await fetch("/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      })
      const data = await response.json()
      return data
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = mutate(url)
    setUrl(result.thumbnails.maxres)
  };
  const toggleWatermark = () => {
    setShowWaterMarkOptions(prev => !prev)
  }
  if(isError) {
    return <div>Error</div>
  }
  return (
    <div className="flex items-center justify-center py-4 w-full">
    <div className="relative flex items-center justify-center p-12 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 shadow-lg md:max-w-[60%] aspect-video">
    {
      !url ? (
      <div className="bg-white dark:bg-black p-4 rounded-lg min-w-[300px] shadow-md transform perspective-500 hover:rotate-y-1 hover:rotate-x-1 transition-transform duration-300">
        <form onSubmit={handleSubmit}>
          <label htmlFor="url-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter URL here
          </label>
          <Input
            type="text"
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste youtube video URL here"
            className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-4"
          />
          <div className="flex justify-end">
          <Button className="text-sm bg-gray-900 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ml-auto">
            Get thumbnail
          </Button>
          </div>
          
        </form>
      </div>
      ) : (
      <div 
        id="imgdiv" 
        className="grid rounded shadow-lg shadow-[#3c3a3a] relative transform perspective-500 rotate-y-0 rotate-x-0 overflow-hidden scale-100 transition-all duration-250"
      >
        <div className="bg-white font-sans text-black rounded border-t-0 border-r-0 border-l-0 overflow-hidden w-full">
          <input 
            name="photo" 
            type="file" 
            accept="image/png, image/jpg, image/jpeg, image/jfif" 
            className="hidden"
          />
          <div>
            <img 
              className="w-full h-full object-cover"
              alt="thumbnail" 
              src={url}
            />
          </div>
        </div>
      </div>
    )
    }

      {/* Watermark */}
      {showWatermark && (
        <div 
          className="absolute bottom-2 right-2 bg-black/30 px-2 py-1 text-white text-sm font-medium rounded cursor-pointer"
          onClick={toggleWatermark}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleWatermark();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {watermarkText}
        </div>
      )}

      {/* Watermark settings (normally hidden, shown here for demonstration) */}
      <div className={cn("absolute bottom-10 right-2 bg-black text-white text-xs p-2 rounded-lg border-2 border-gray-500", showWaterMarkOptions ? 'block' : 'hidden')}>
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showWatermark}
            onChange={(e) => setShowWatermark(e.target.checked)}
            className="sr-only peer"
          />
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"/>
          <span className="ml-3 text-sm font-medium">Show Watermark</span>
        </label>
        <div className="flex items-center my-2 space-x-2">
          {['dark', 'light', 'glassy'].map((style) => (
            <button
              type="button"
              key={style}
              onClick={() => setWatermarkStyle(style)}
              className={`px-2 py-1 rounded text-xs ${
                watermarkStyle === style
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="Watermark text"
          className="w-full bg-gray-800 p-1 text-sm mt-2 rounded"
        />
      </div>
    </div>
    </div>
  );
};

interface EditorSidebarProps {
    text?: string
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ text }) => {
  const [showWatermark, setShowWatermark] = useState(true);
  const [frame, setFrame] = useState('none');
  const [color, setColor] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');
  const [activeTabs, setActiveTabs] = useState<ActiveTabs>('Edit')
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle range input changes
  };

  const handleFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrame(e.target.value);
  };

  return (
    <div id="rightAside" className=" bg-white dark:bg-[#1a1a1a] p-2 relative top-0 right-0 z-20 pb-12 scrollbar-none overflow-auto md:h-[calc(100vh-56px)]">
      <div className="w-full flex flex-row items-center justify-between rounded-t-xl p-2 text-xs font-medium border bg-gray-50 dark:bg-[#0f0f0f] dark:border-gray-950">
        <button type="button" className={cn("px-4 text-center py-2 rounded-lg cursor-pointer font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1", activeTabs === 'Settings' && 'bg-gray-200 dark:bg-[#121212]')} onClick={() => setActiveTabs('Settings')}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg" aria-labelledby="settingsIconTitle">
            <title id="settingsIconTitle">Settings</title>
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>
        <button type="button" className="w-full text-center py-2 rounded-lg cursor-pointer bg-white dark:bg-[#1a1a1a] shadow-md font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1">
          Edit
        </button>
        <button type="button" className="w-full text-center py-2 rounded-lg cursor-pointer font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1">
          Background
        </button>
      </div>

      
      {
        activeTabs === 'Edit' && (
            <>
            
        <div className="p-4 my-2 rounded-xl text-sm">
        <div className="flex items-start mb-6">
          <div className="flex items-center cursor-pointer mt-4 relative py-0.5 px-3 border border-gray-300 dark:border-gray-600 rounded-2xl mr-4">
            <span>Color</span>
            <span className="h-4 w-4 rounded-full ml-1 border border-gray-400" style={{ backgroundColor: color }} />
          </div>
          <div className="flex items-center cursor-pointer mt-4 relative py-0.5 px-3 border border-gray-300 dark:border-gray-600 rounded-2xl">
            <span>Background</span>
            <span className="h-4 w-4 rounded-full ml-1 border border-gray-400" style={{ backgroundColor: background }}/>
          </div>
        </div>
        

        <div className="flex justify-between items-start">
          <div className="flex flex-col w-full">
            {['Round', 'Shadow', 'Padding', 'Scale'].map((label) => (
              <div key={label} className="flex items-center mb-2 text-xs font-medium">
                <span className="mr-2 md:mr-0 flex-1">{label}</span>
                <input
                  className="range accent-gray-600 mx-4 w-2/4"
                  type="range"
                  min={label === 'Scale' ? "0.15" : "0"}
                  max={label === 'Round' ? "60" : label === 'Shadow' ? "100" : label === 'Padding' ? "10" : "2"}
                  step={label === 'Padding' ? "0.5" : label === 'Scale' ? "0.1" : "1"}
                  id={label.toLowerCase()}
                  onChange={handleRangeChange}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center border-l border-gray-400 px-4 py-2">
            <span className="flex-1 font-medium px-3 py-1 mb-2 rounded-full border border-gray-600 cursor-pointer select-none text-sm bg-gray-100 dark:bg-[#1a1a1a]">
              Tilt
            </span>
            {/* Removed Joystick component */}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <h6 className="text-sm font-medium mr-2">Frame</h6>
            <select
              name="category"
              className="outline-none bg-white dark:bg-[#19191a] px-2 py-1 border border-gray-600 rounded-full text-sm text-black dark:text-white"
              value={frame}
              onChange={handleFrameChange}
            >
              <option value="none">None</option>
              <option value="macOS-black">macOS Black</option>
              <option value="macOS-white">macOS White</option>
              <option value="photograph">Photograph</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="dodgerblue">Blue</option>
              <option value="hotpink">Hotpink</option>
              <option value="green">Green</option>
              <option value="blueviolet">Blue Violet</option>
              <option value="gold">Gold</option>
            </select>
          </div>
          <div className="bg-gray-100 dark:bg-[#1a1a1a] cursor-pointer flex items-center px-3 py-1 border border-gray-500 rounded-full">
            <span>Shadow</span>
            <span className="h-4 w-4 rounded-full ml-1 bg-gray-800 border border-gray-400"/>
          </div>
        </div>
      </div>
      </>
        )
      }


      {/* Watermark toggle */}

      <label className="inline-flex items-center m-2 my-8 cursor-pointer">
        <input
          id="showWatermark"
          type="checkbox"
          className="sr-only peer"
          checked={showWatermark}
          onChange={(e) => setShowWatermark(e.target.checked)}
        />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600" />
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-100">Show Watermark</span>
      </label>

      {/* Upgrade section */}
      <a className="flex flex-col border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-3 rounded-sm transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2" href="/pricing">
        <button className="flex items-center text-sm" type="button">
          <img src="/crown.webp" alt="upgrade" className="w-4 h-4 mr-2.5 rounded-sm" />
          <span>Upgrade</span>
        </button>
        <p className="text-xs mt-2">
          Get 50% off on <span className="font-semibold">Lifetime</span> deal, use code <span className="font-semibold font-mono">NEW50</span>
        </p>
      </a>
    </div>
  );
};
