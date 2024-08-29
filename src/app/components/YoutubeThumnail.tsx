'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChangeEvent, useState } from "react"
import { cn } from "@/lib/utils"

type ActiveTabs = 'Settings' | 'Edit' | 'Background';

const extractYoutubeVideoId = (url: string): string | null => {
    // Regular expression to match both URL formats
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/))([^?&]+)/;
    
    const match = url.match(regex);
    
    // If a match is found, return the captured group (video ID)
    // Otherwise, return null
    return match ? match[1] : null;
  };


export function YoutubeThumbnail() {
  const [VideoUrl, setVideoUrl] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const videoId = extractYoutubeVideoId(VideoUrl)
    if (videoId) {
      setImageUrl('https://img.youtube.com/vi/fHh29py_Uoc/maxresdefault.jpg')
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={VideoUrl}
            placeholder="Enter YouTube Video Url"
            className="w-full"
            onChange={(e) => setVideoUrl(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Get Thumbnail
          </Button>
        </form>
        { imageUrl && (
                <div className="mt-4">
                <img src={imageUrl} alt="YouTube Thumbnail" className="w-full rounded-lg" />
            </div>
            )
        }
        <ImageUploadComponent />
        <EditorSidebar text="Made By John 🔥" />
      </CardContent>
    </Card>
  )
}


const ImageUploadComponent: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>('https://img.youtube.com/vi/fHh29py_Uoc/maxresdefault.jpg');
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkText, setWatermarkText] = useState('Picyard');
  const [watermarkStyle, setWatermarkStyle] = useState('Dark');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    }
  };

  return (
    <div className="flex justify-center items-center py-4 w-full">
      <div 
        className="ssMainTernary shadow-lg md:max-w-[50%] md:max-w-[60%] relative flex items-center justify-center overflow-hidden"
        style={{
          padding: '3rem',
          background: 'linear-gradient(135deg, #FF002C, #FF0057, #FF0082, #FF00AD, #FF00D8, #C100FF, #8900FF, #5900FF, #2400FF)',
          aspectRatio: 'auto',
          filter: 'brightness(1) contrast(1) grayscale(0) blur(0px) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)',
          scrollMargin: '0px'
        }}
      >
        <div 
          className="grid relative overflow-hidden transition-all duration-250 ease-in-out"
          style={{
            borderRadius: '1px',
            boxShadow: '0px 4px 20px 0px rgb(60, 58, 58)',
            transform: 'perspective(500px) rotateY(0deg) rotateX(0deg)',
            scale: '1'
          }}
        >
          <div className="bg-white font-sans text-black rounded overflow-hidden w-full">
            <input 
              type="file" 
              accept="image/png, image/jpg, image/jpeg,image/jfif" 
              className="hidden"
              onChange={handleFileChange}
            />
            {imageUrl && (
              <div>
                <img src={imageUrl} alt="thumbnail" className="w-full h-auto" />
              </div>
            )}
          </div>
        </div>

        {showWatermark && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-30 px-2 py-1 font-medium text-white rounded cursor-pointer z-10">
            {watermarkText}
          </div>
        )}

        <div className="absolute bottom-9 right-2 bg-black text-xs p-2 font-medium text-white rounded-lg z-50 cursor-pointer border-2 border-silver hidden items-center">
          <label className="inline-flex items-center my-4 cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
            />
            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"/>
            <span className="ms-3 text-sm font-medium text-white">Show Watermark</span>
          </label>
          <div className="flex items-center my-2">
            {['Dark', 'Light', 'Glassy'].map((style) => (
              <span 
                key={style}
                className={`${style === watermarkStyle ? 'bg-white text-black' : 'bg-black text-white'} rounded-md px-2 py-1 border border-gray-500 mr-2 cursor-pointer`}
                onClick={() => setWatermarkStyle(style)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setWatermarkStyle(style);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {style}
              </span>
            ))}
          </div>
          <div className="flex items-center mt-1">
            <input 
              className="bg-gray-800 p-1 text-sm mt-2 text-white text-sm"
              placeholder="Made By John 🔥"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </div>
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
    <div id="rightAside" className="w-full md:max-w-[340px] bg-white dark:bg-[#1a1a1a] p-2 relative top-0 right-0 z-20 pb-12 scrollbar-none overflow-auto md:h-[calc(100vh-56px)]">
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
