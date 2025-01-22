'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { ResetIcon } from "@radix-ui/react-icons"
import { toast } from "react-toastify"
import { Gradients } from "@/constants/gradient"
import { PlainColors } from "@/constants/plainColors"
import { Transform } from "@/constants/transform"
import { Position } from "@/constants/constant"
import { useConfirm } from "@/hooks/use-confirm"

type ActiveTabs = 'Settings' | 'Edit' | 'Background';
type SubActiveTabs = 'Gradient' | 'Image' | 'Solid';
const initialTransform = 'perspective(500px) rotateY(0deg) rotateX(0deg)';
const initialPosition = '1 1 1 1';
const initialFileName = 'ToolsArsenal_2348239234';
const initialLinearGradient = 'linear-gradient(135deg, rgb(255, 0, 44), rgb(255, 0, 87), rgb(255, 0, 130), rgb(255, 0, 173), rgb(255, 0, 216))';
const heartFilled = '#F91880'
const heartEmpty = 'white'
const heartFilledBg = '#F91880'
const heartEmptyBg = 'white'

const initialFilters: Partial<Filters> = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  blur: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 1,
  saturate: 1,
  sepia: 0
}


interface Filters {
  brightness: number
  setBrightness: (value: number) => void
  contrast: number
  setContrast: (value: number) => void
  grayscale: number
  setGrayscale: (value: number) => void
  blur: number
  setBlur: (value: number) => void
  hueRotate: number
  setHueRotate: (value: number) => void
  invert: number
  setInvert: (value: number) => void
  opacity: number
  setOpacity: (value: number) => void
  saturate: number
  setSaturate: (value: number) => void
  sepia: number
  setSepia: (value: number) => void
}
interface ThumbnailComponentProps {
  paddingValue: number
  imageScale: number
  imageBorder: number
  imageShadow: number
  imageTransform: string
  imagePosition: string
  filters: Partial<Filters>
  linearGradient: string
  backgroundImage: number
  subActiveTab: SubActiveTabs
}

interface EditorSidebarProps {
  text?: string
  paddingValue: number
  setPaddingValue: (value: number) => void
  imageScale: number
  setImageScale: (value: number) => void
  imageBorder: number
  setImageBorder: (value: number) => void
  imageShadow: number
  setImageShadow: (value: number) => void
  imageTransform: string
  setImageTransform: (value: string) => void
  imagePosition: string
  setImagePosition: (value: string) => void
  filters: Filters
  setFilters: (value: Filters) => void
  fileName: string
  setFileName: (value: string) => void
  linearGradient: string
  setLinearGradient: (value: string) => void
  backgroundImage: number
  setBackgroundImage: (value: number) => void
  subActiveTab: SubActiveTabs
  setSubActiveTab: (value: SubActiveTabs) => void
}

function TwitterMockup() {
  const [paddingValue, setPaddingValue] = useState(3)
  const [imageScale, setImageScale] = useState(1)
  const [imageBorder, setImageBorder] = useState(1)
  const [imageShadow, setImageShadow] = useState(18)
  const [imageTransform, setImageTransform] = useState(initialTransform)
  const [imagePosition, setImagePosition] = useState(initialPosition)
  const [filters, setFilters] = useState(initialFilters)
  const [fileName, setFileName] = useState(initialFileName)
  const [linearGradient, setLinearGradient] = useState(initialLinearGradient)
  const [backgroundImage, setBackgroundImage] = useState(1)
  const [subActiveTab, setSubActiveTab] = useState<SubActiveTabs>('Gradient')
  return (
        <div id="maindiv" className="flex flex-col sm:flex-row justify-between overflow-auto bg-[#f5f5f5] dark:bg-[#141414]" style={{minHeight:"calc(-56px + 100vh)"}}
        >
          <ThumbnailComponent 
            paddingValue={paddingValue} 
            imageScale={imageScale} 
            imageBorder={imageBorder}
            imageShadow={imageShadow}
            imageTransform={imageTransform}
            imagePosition={imagePosition}
            filters={filters}
            linearGradient={linearGradient}
            backgroundImage={backgroundImage}
            subActiveTab={subActiveTab}
          />
          <EditorSidebar 
            text="Made By John 🔥" 
            paddingValue={paddingValue} 
            setPaddingValue={setPaddingValue} 
            imageScale={imageScale} 
            setImageScale={setImageScale}
            imageBorder={imageBorder}
            setImageBorder={setImageBorder}
            imageShadow={imageShadow}
            setImageShadow={setImageShadow}
            imageTransform={imageTransform}
            setImageTransform={setImageTransform}
            imagePosition={imagePosition}
            setImagePosition={setImagePosition}
            filters={filters as Filters}
            setFilters={setFilters}
            fileName={fileName}
            setFileName={setFileName}
            linearGradient={linearGradient}
            setLinearGradient={setLinearGradient}
            backgroundImage={backgroundImage}
            setBackgroundImage={setBackgroundImage}
            subActiveTab={subActiveTab}
            setSubActiveTab={setSubActiveTab}
        />
      </div>
  )
}


const ThumbnailComponent = ({
  paddingValue, 
  imageScale, 
  imageBorder,
  imageShadow,
  imageTransform,
  imagePosition,
  filters,
  linearGradient,
  backgroundImage,
  subActiveTab
}:
  ThumbnailComponentProps
) => {
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkStyle, setWatermarkStyle] = useState('dark');
  const [watermarkText, setWatermarkText] = useState('ToolsArsenal');
  const [showWaterMarkOptions, setShowWaterMarkOptions] = useState(false)
  const [error, setError] = useState(false)
  const [heartColor, setHeartColor] = useState(heartEmpty)
  const [heartBg, setHeartBg] = useState(heartEmptyBg)
  const [userImage, setUserImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleToggleHeart = () => {
    setHeartColor(prevColor => prevColor === heartEmpty ? heartFilled : heartEmpty)
    setHeartBg(prevBg => prevBg === heartEmptyBg ? heartFilledBg : heartEmptyBg)
  }
  const ResetState = () => {
    setError(false)
  }
  const toggleWatermark = () => {
    setShowWaterMarkOptions(prev => !prev)
  }
  // const paddingOuter = Position2[imagePosition as keyof typeof Position2](paddingValue)
  return (
    <div className="flex flex-col  items-center justify-center py-4 w-full">
      <div
        id="ss"
        className="shadow-lg sm:max-w-[50%] md:max-w-[60%]"
        style={{
          padding: (() => {
            const value = paddingValue;
            const [top, right, bottom, left] = imagePosition.split(' ');
            return `${top === '0' ? '0rem' : top === '1' ? `${value}rem` : `${2 * value}rem`} ${right === '0' ? '0rem' : right === '1' ? `${value}rem` : `${2 * value}rem`} ${bottom === '0' ? '0rem' : bottom === '1' ? `${value}rem` : `${2 * value}rem`} ${left === '0' ? '0rem' : left === '1' ? `${value}rem` : `${2 * value}rem`}`;
          })(),
          margin: '0px',
          background: subActiveTab === 'Gradient' ? linearGradient : `url(/test${backgroundImage}.webp)`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter:
            `brightness(${filters.brightness}) contrast(${filters.contrast}) grayscale(${filters.grayscale}) blur(${filters.blur}px) hue-rotate(${filters.hueRotate}deg) invert(${filters.invert}) opacity(${filters.opacity}) saturate(${filters.saturate}) sepia(${filters.sepia})`,
          overflow: 'hidden',
          opacity: '1',
          scrollMargin: '0px',
        }}
      >
          <div
          id="imgdiv"
          style={{
            display: 'grid',
            borderRadius: `${imageBorder}px`,
            boxShadow: `rgb(60, 58, 58) 0px 4px ${imageShadow}px 0px`,
            position: 'relative',
            transform: imageTransform,
            overflow: 'hidden',
            scale: `${imageScale}`,
            transition: 'all 0.25s ease 0s',
          }}
        >
          <div
  style={{
    backgroundColor: "white",
    padding: "16px",
    fontFamily: "sans-serif",
    color: "black",
    borderRadius: "1px",
    borderTopWidth: "medium",
    borderRightWidth: "medium",
    borderLeftWidth: "medium",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderLeftStyle: "none",
    borderTopColor: "currentcolor",
    borderRightColor: "currentcolor",
    borderLeftColor: "currentcolor",
    borderImage: "none",
    overflow: "hidden",
  }}
>
  <input
    name="photo"
    type="file"
    accept="image/png, image/jpg, image/jpeg,image/jfif"
    style={{ display: "none" }}
    onChange={handleFileChange}
    ref={fileInputRef}
  />
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        alt="Elon Musk"
        src={userImage || "https://www.picyard.in/Elon.jpg"}
        style={{ width: "48px", height: "48px", borderRadius: "50%" }}
        onClick={handleImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick();
          }
        }}
      />
      <div
        style={{
          marginLeft: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxHeight: "40px",
          height: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            contentEditable="true"
            style={{
              marginBottom: "0px",
              fontSize: "15px",
              fontWeight: "600",
              outline: "currentcolor",
              border: "medium",
              background: "none",
              color: "black",
              display: "inline-block",
              boxSizing: "border-box",
              width: "100%",
              height: "21px",
            }}
          >
            Elon Musk
          </span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            color="rgb(29, 155, 240)"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: "rgb(29, 155, 240)",
              height: "20px",
              marginLeft: "1px",
            }}
          >
            <title>like</title>
            <path d="M17.03 9.78a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6Z"/>
            <path d="m14.136 1.2 1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 0 1 3.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 0 1 0 4.272l-1.01 1.375a2.106 2.106 0 0 0-.384.929l-.259 1.687a3.61 3.61 0 0 1-3.021 3.02l-1.686.259a2.106 2.106 0 0 0-.929.384l-1.375 1.01a3.61 3.61 0 0 1-4.272 0l-1.375-1.01a2.106 2.106 0 0 0-.929-.384l-1.687-.259a3.61 3.61 0 0 1-3.02-3.021l-.259-1.686a2.117 2.117 0 0 0-.384-.929L1.2 14.136a3.61 3.61 0 0 1 0-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 0 1 3.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 0 1 4.272 0Zm-3.384 1.209-1.375 1.01a3.614 3.614 0 0 1-1.59.658l-1.686.258a2.111 2.111 0 0 0-1.766 1.766l-.258 1.686a3.61 3.61 0 0 1-.658 1.589l-1.01 1.376a2.11 2.11 0 0 0 0 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 0 1 1.589.658l1.376 1.01a2.11 2.11 0 0 0 2.496 0l1.375-1.01a3.613 3.613 0 0 1 1.59-.657l1.686-.26a2.11 2.11 0 0 0 1.766-1.765l.258-1.686a3.61 3.61 0 0 1 .658-1.589l1.01-1.376a2.11 2.11 0 0 0 0-2.496l-1.01-1.375a3.613 3.613 0 0 1-.657-1.59l-.26-1.686a2.11 2.11 0 0 0-1.765-1.766l-1.686-.258a3.61 3.61 0 0 1-1.589-.658l-1.376-1.01a2.11 2.11 0 0 0-2.496 0Z"/>
          </svg>
        </div>
        <span
          contentEditable="true"
          style={{
            marginBottom: "0px",
            fontSize: "14px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            outline: "currentcolor",
            border: "medium",
            background: "none",
            color: "rgb(83, 100, 113)",
            display: "inline-block",
            width: "100%",
          }}
        >
          @elonmusk
        </span>
      </div>
    </div>
    <div>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        color="rgb(83, 100, 113)"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "rgb(83, 100, 113)" }}
      >
        <title>more</title>
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
      </svg>
    </div>
  </div>
  <p
    contentEditable="true"
    style={{
      outline: "currentcolor",
      border: "medium",
      margin: "8px 0px",
    }}
  >
    Picyard is the best tool for creating image mockups
  </p>
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }}
  >
    <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth={0} 
    viewBox="0 0 16 16" 
    color="#536471" 
    height={18} 
    width={18} 
    xmlns="http://www.w3.org/2000/svg" 
    style={{color: "rgb(83, 100, 113)"}}
    >
    <title>something</title>
    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
    </svg>
    <div className="flex justify-center items-center">
      <svg
        height={20}
        width={20}
        viewBox="0 0 24 24"
        fill={heartColor}
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleToggleHeart}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggleHeart();
          }
        }}
        className="flex items-center justify-center"
      >
        <title>Heart</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="black"
          strokeWidth={heartColor === heartFilled ? 0 : 1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" color="#536471" height="16" width="16" xmlns="http://www.w3.org/2000/svg" style={{color: "rgb(83, 100, 113)"}}>
    <title>temp</title><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/></svg>
    
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="#536471" height="18" width="18" xmlns="http://www.w3.org/2000/svg" style={{color: "rgb(83, 100, 113)"}}><title>temp2</title><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </div>
    </div>
   </div>
        

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
      <div className="flex flex-row justify-between text-end items-end cursor-pointer hover:scale-105 transition-all duration-100 group-hover/reset">
        <ResetIcon onClick={ResetState} className="size-4 text-gray-500 group-hover/reset:text-gray-900"/>
      </div>
    </div>
  );
};



const EditorSidebar = ({ 
  text, 
  paddingValue, 
  setPaddingValue, 
  imageScale, 
  setImageScale, 
  imageBorder, 
  setImageBorder,
  imageShadow,
  setImageShadow,
  imageTransform,
  setImageTransform,
  imagePosition,
  setImagePosition,
  filters,
  setFilters,
  fileName,
  setFileName,
  linearGradient,
  setLinearGradient,
  backgroundImage,
  setBackgroundImage,
  subActiveTab,
  setSubActiveTab
}: EditorSidebarProps) => {
  const [ResetDialog, confirm] = useConfirm(
    'Reset',
    'Are you sure you want to reset? Changes are irreversible.'
  )

  const [showWatermark, setShowWatermark] = useState(true);
  const [frame, setFrame] = useState('none');
  const [color, setColor] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');
  const [activeTabs, setActiveTabs] = useState<ActiveTabs>('Edit')
  const [subActiveTabs, setSubActiveTabs] = useState<SubActiveTabs>('Gradient')
  const [selectedGradient, setSelectedGradient] = useState<string>(Gradients[0])
  const [selectedSolidColor, setSelectedSolidColor] = useState<string>(PlainColors[0])
  const [selectedImage, setSelectedImage] = useState<number>(1)

  // extract rgb values from gradient
  function extractRGBValues(gradient:string) {
    const rgbRegex = /rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/g;
    return gradient.match(rgbRegex);
  }

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle range input changes
  };
  const handleGradientChange = (gradient: string) => {
    setSelectedGradient(gradient);
    setLinearGradient(gradient);
  };
  const handleFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrame(e.target.value);
  };
  const handleTransform = (index: number) => {
    if(imageTransform === Transform[index]) {
      setImageTransform(initialTransform);
    }
    else setImageTransform(Transform[index]);
  };
  const handlePosition = (index: number) => {
    if(imagePosition === Position[index]) {
      setImagePosition(initialPosition);
    }
    else {
      setImagePosition(Position[index])
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleReset = async () => {
    const ok = await confirm();
    if(ok) {
      setFilters(initialFilters as Filters);
      setFileName(initialFileName);
    }else return;
  };
  const handleSubActiveTabChange = (tab: SubActiveTabs) => {
    setSubActiveTab(tab);
    setSubActiveTabs(tab);
  };
  const handleImageChange = (num: number) => {
    setBackgroundImage(num);
    setSelectedImage(num);
  }
  return (
    <div id="rightAside" className="w-full justify-center items-center md:justify-normal sm:max-w-[340px] md:w-full bg-white dark:bg-[#1a1a1a] p-2 relative top-0 right-0 z-20 pb-12 scrollbar-none overflow-auto md:h-[calc(100vh-56px)]">
      <ResetDialog />
        <div className="w-full flex flex-row items-center justify-between rounded-t-xl p-2 text-xs font-medium border bg-gray-50 dark:bg-[#0f0f0f] dark:border-gray-950">
          <p className={cn("px-4 text-center py-2 rounded-lg cursor-pointer dark:bg-[#1a1a1a] font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1", activeTabs === 'Settings' && 'bg-white px-4 shadow-md')}
              onClick={() => setActiveTabs('Settings')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveTabs('Settings');
                }
              }}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg" aria-labelledby="settingsIconTitle">
              <title id="settingsIconTitle">Settings</title>
              <path fill="none" d="M0 0h24v24H0V0z"/>
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </p>
          <p className={cn("w-full text-center py-2 rounded-lg cursor-pointer font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1", activeTabs === 'Edit' && 'bg-white px-4 shadow-md')}
            onClick={() => setActiveTabs('Edit')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTabs('Edit');
              }
            }}
          >Edit</p>
          <p className={cn("w-full text-center py-2 rounded-lg cursor-pointer font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1", activeTabs === 'Background' && 'bg-white px-4 shadow-md')}
            onClick={() => setActiveTabs('Background')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTabs('Background');
              }
            }}
          >Background</p>
        </div>
        {
          activeTabs === 'Settings' && (
          <div className="p-2">
              <div className="flex items-center justify-between mt-2">
                <h6 className="flex items-center text-sm">
                  Quality
                  <select className="outline-none bg-white dark:bg-[#0f0f0f] mx-2 px-2 border border-gray-600 rounded-lg text-black dark:text-white">
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="4">4x</option>
                    <option value="6">6x</option>
                    <option value="8">8x</option>
                  </select>
                </h6>
                <h6 className="flex items-center text-sm">
                  Format
                  <select className="outline-none bg-white dark:bg-[#0f0f0f] mx-2 px-2 border border-gray-600 rounded-lg text-black dark:text-white">
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="svg">SVG</option>
                    <option value="webp">WEBP</option>
                  </select>
                </h6>
              </div>
              <div className="my-8">
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Brightness:</label>
                  <input name="brightness" className="range accent-gray-600" type="range" min="0" max="2" step="0.1" value={filters.brightness} onChange={handleFilterChange}/>
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Contrast:</label>
                  <input name="contrast" className="range accent-gray-600" type="range" min="0" max="2" step="0.1" value={filters.contrast} onChange={handleFilterChange} />
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Grayscale:</label>
                  <input name="grayscale" className="range accent-gray-600" type="range" min="0" max="1" step="0.1" value={filters.grayscale} onChange={handleFilterChange} />
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Blur:</label>
                  <input name="blur" className="range accent-gray-600" type="range" min="0" max="10" step="0.5" value={filters.blur} onChange={handleFilterChange} />
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Hue-rotate:</label>
                  <input name="hueRotate" className="range accent-gray-600" type="range" min="0" max="360" step="10" value={filters.hueRotate} onChange={handleFilterChange} />
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Invert:</label>
                  <input name="invert" className="range accent-gray-600" type="range" min="0" max="1" step="0.1" value={filters.invert} onChange={handleFilterChange} />
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Opacity:</label>
                  <input name="opacity" className="range accent-gray-600" type="range" min="0" max="1" step="0.1" value={filters.opacity} onChange={handleFilterChange} />
                </div>
                  <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Saturate:</label>
                  <input name="saturate" className="range accent-gray-600" type="range" min="0" max="2" step="0.1" value={filters.saturate} onChange={handleFilterChange} />
                </div>
                <div className="flex items-center text-xs mb-2 mt-4 font-medium">
                  <label className="flex-shrink-0 w-20">Sepia:</label>
                  <input name="sepia" className="range accent-gray-600" type="range" min="0" max="1" step="0.1" value={filters.sepia} onChange={handleFilterChange} />
                </div>
              </div>
              <div className="flex items-center text-sm mb-4 mt-4">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className="mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <title>File Name</title>
                  <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"/>
                </svg>
                  <span className="mx-1">File Name</span>
                <input type="text" className="outline-none border-b border-gray-400 bg-transparent text-black dark:text-white ml-1 text-xs" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
              </div>
              <button className="flex items-center text-sm mt-2 px-4 py-2 rounded-lg font-medium border border-gray-700 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#121212]" type="button"
                onClick={handleReset}
              >
                Reset 
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <title>Reset</title>
                  <path fill="none" d="M0 0h24v24H0V0z"/>
                  <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                </svg>
              </button>
            </div>

          )
        }
        {
          activeTabs === 'Edit' && (
            <>
              <div className="p-4 my-2 rounded-xl text-sm">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex items-center cursor-pointer mt-4 relative py-0.5 px-3 border border-gray-300 dark:border-gray-600 rounded-2xl mr-4 w-[45%]">
                    <span>Color</span>
                    <span className="h-4 w-4 rounded-full ml-1 border border-gray-400" style={{backgroundColor: "rgb(0, 0, 0)"}}/>
                  </div>
                  <div className="flex items-center w-[45%] cursor-pointer mt-4 relative py-0.5 px-3 border border-gray-300 dark:border-gray-600 rounded-2xl">
                    <span>Background</span>
                    <span className="h-4 w-4 rounded-full ml-1 border border-gray-400" style={{backgroundColor: "rgb(255, 255, 255)"}}/>
                  </div>
                </div>
                <div className="flex flex-row justify-between align-center mt-4">
                <div className="flex flex-col items-center justify-center w-[70%]">
                  <div className="flex flex-col items-start justify-center">
                    <div style={{fontSize: "12px", marginBottom: "8px", fontWeight: "500", display: "flex", alignItems: "center", width: "100%"}}>
                      <span className="mr-2 md:mr-0" style={{flex: "1 1 0%"}}>Round</span>
                      <input className="range accent-gray-600 mx-4 w-2/4" type="range" min="0" max="60" step="1" id="roundness" value={imageBorder} onChange={(e) => setImageBorder(Number(e.target.value))} />
                    </div>
                    <div style={{fontSize: "12px", marginBottom: "8px", fontWeight: "500", display: "flex", alignItems: "center"}}>
                      <span className="mr-2 md:mr-0" style={{flex: "1 1 0%"}}>Shadow</span>
                      <input className="range accent-gray-600 mx-4 w-2/4" type="range" min="0" max="100" step="1" id="shadow" value={imageShadow} onChange={(e) => setImageShadow(Number(e.target.value))} />
                    </div>
                    <div style={{fontSize: "12px", marginBottom: "8px", fontWeight: "500", display: "flex", alignItems: "center"}}>
                      <span className="mr-2 md:mr-0" style={{flex: "1 1 0%"}}>Padding</span>
                      <input className="range accent-gray-600 mx-4 w-2/4" type="range" min="0" max="10" step="1" id="pdng" value={paddingValue} onChange={(e) => setPaddingValue(Number(e.target.value))} />
                    </div>
                    <div style={{fontSize: "12px", marginBottom: "8px", fontWeight: "500", display: "flex", alignItems: "center"}}>
                      <span className="mr-2 md:mr-0" style={{flex: "1 1 0%"}}>Scale</span>
                      <input className="range accent-gray-600 mx-4 w-2/4" type="range" min="0.15" max="2" step="0.1" id="scale" value={imageScale} onChange={(e) => setImageScale(Number(e.target.value))} />
                    </div>
                  </div> 
                </div>  
                <div className="flex flex-col items-center border-l border-gray-400 px-4 py-2 w-[28%]">
                    <span className="flex-1 font-medium px-3 py-1 mb-2 rounded-full border border-gray-600 cursor-pointer select-none text-sm bg-gray-100 dark:bg-[#1a1a1a] my-auto">
                      Tilt
                    </span>
                    <div>
                      <div data-testid="joystick-base" className="" style={{borderRadius: "40px", height: "40px", width: "40px", background: "whitesmoke", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <button className="" type="button" style={{borderRadius: "40px", background: "black", cursor: "move", height: "26.666667px", width: "26.666667px", border: "medium", flexShrink: "0", touchAction: "none"}}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-wrap" style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px"}}>
                  <h6 className="flex items-center text-sm font-medium">
                    Frame
                    <select name="category" className="outline-none bg-white dark:bg-[#19191a] ml-2 px-2 py-1 border border-gray-600 rounded-full text-sm text-black dark:text-white">
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
                  </h6>
                  <div className="bg-gray-100 dark:bg-[#1a1a1a]" style={{cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "2px 12px", border: "1px solid rgb(80, 80, 80)", borderRadius: "18px"}}>
                    <span>Shadow</span>
                    <span style={{height: "16px", width: "16px", borderRadius: "50%", backgroundColor: "rgb(30, 30, 30)", border: "1px solid gray", marginLeft: "4px"}}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-4 rounded-xl text-sm w-full">
              <div className="flex overflow-x-auto scroll-m-0 scrollbar-none">
                {[...Array(11)].map((_, index) => (
                  <div 
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index} 
                    className={cn("flex-shrink-0 w-20 h-20 mr-2 rounded-sm", imageTransform === Transform[index] && 'border-[1px] border-black')} 
                    style={{
                      background: 'linear-gradient(135deg, #FF002C, #FF0057, #FF0082, #FF00AD, #FF00D8, #C100FF, #8900FF, #5900FF, #2400FF)',
                      backgroundSize: 'cover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'brightness(1) contrast(1) grayscale(0) blur(0px) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)',
                    opacity: 1
                  }}
                    onClick={() => handleTransform(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setImageTransform(Transform[index]);
                      }
                    }}
                  >
                    <div className="w-12 h-12 bg-slate-50 border" style={{
                      transform: Transform[index]
                    }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-3 w-fit">
                  {Position.map((position, index) => (
                    <div key={position} className={cn("w-16 h-10 m-1 rounded bg-slate-200 dark:bg-slate-700", imagePosition === position && 'border-[1px] border-black')}
                      onClick={() => handlePosition(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handlePosition(index);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            </>
          )
        }
        {
          activeTabs === 'Background' && (
            <>
                {/* sub menu */}
                <div className="w-full flex flex-row items-center justify-between rounded-b-xl p-2 text-xs font-medium border bg-gray-50 dark:bg-[#0f0f0f] dark:border-gray-950">
                  <p className={cn("w-full text-center py-2 rounded-[10px] cursor-pointer  font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] ", subActiveTabs === 'Gradient' && 'bg-white dark:bg-[#1a1a1a] shadow-md')}
                    onClick={() => handleSubActiveTabChange('Gradient')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSubActiveTabChange('Gradient');
                      }
                    }}
                  >
                    Gradient
                  </p>
                  <p className={cn("w-full text-center py-2 rounded-[10px] cursor-pointer font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1", subActiveTabs === 'Image' && 'bg-white dark:bg-[#1a1a1a] shadow-md')}
                    onClick={() => handleSubActiveTabChange('Image')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSubActiveTabChange('Image');
                      }
                    }}
                  >
                    Image
                  </p>
                  <p className={cn("w-full text-center py-2 rounded-[10px] cursor-pointer font-semibold hover:bg-gray-200 dark:hover:bg-[#121212] mx-1", subActiveTabs === 'Solid' && 'bg-white dark:bg-[#1a1a1a] shadow-md')}
                    onClick={() => handleSubActiveTabChange('Solid')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSubActiveTabChange('Solid');
                      }
                    }}
                  >
                    Solid
                  </p>
              </div>

              {/* gradient */}
              {
                subActiveTabs === 'Gradient' && (
                  <>
                    <Input
                      type="Color"
                      className="w-full h-10"
                    />
                    <div className="flex mt-3">
                      {
                        extractRGBValues(selectedGradient)?.map((color, index) => (
                            <span style={{background: color, height: "30px", width: "30px", margin: "4px", borderRadius: "4px", border: "1px solid gray", position: "relative"}} key={color}
                            >
                            <span className="absolute -top-2 -right-1 bg-white dark:bg-[rgb(5,50,50)] flex justify-center items-center rounded-full p-1">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <title>whatever</title>
                                <path fill="none" d="M0 0h24v24H0V0z" />
                                <path d="m17.66 5.41.92.92-2.69 2.69-.92-.92 2.69-2.69M17.67 3c-.26 0-.51.1-.71.29l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42l-2.34-2.34c-.2-.19-.45-.29-.7-.29zM6.92 19 5 17.08l8.06-8.06 1.92 1.92L6.92 19z" />
                              </svg>
                            </span>
                          </span>
                        ))
                      }
                    </div>
                    <div className="flex w-full flex-wrap max-h-[20vh] md:max-h-[40vh] overflow-y-scroll scroll-m-0 justify-center bg-white dark:bg-[#0f0f0f] dark:border-gray-700 border-gray-300 rounded-xl mt-2 p-1">
                      {
                        Gradients.map((gradient, index) => (
                          <span className={cn("block h-8 w-8 m-1 rounded-md border border-gray-400 cursor-pointer", selectedGradient === gradient && 'border-1 rounded-full')} style={{background: gradient}} key={gradient}
                            onClick={() => handleGradientChange(gradient)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleGradientChange(gradient);
                              }
                            }}

                          />
                        )
                      )
                      }
                    </div>
                  </>
                )
              }

              {/* image */}
              {
                subActiveTabs === 'Image' && (
                  <>
                  <div className="flex w-full flex-wrap max-h-[20vh] md:max-h-[40vh] overflow-y-scroll scroll-m-0 justify-center bg-white dark:bg-[#0f0f0f] dark:border-gray-700 border-gray-300 rounded-xl mt-2 p-1"
                  >
                    {Array.from({ length: 70 }, (_, i) => i + 1).map((number) => (
                      <img 
                        key={number}
                        src={`/test${number}.webp`}
                        alt={`bg ${number}`}
                        className={cn("h-12 w-12 m-1 aspect-square rounded-sm object-cover", selectedImage === number && ' rounded-full')}
                        onClick={() => handleImageChange(number)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleImageChange(number);
                          }
                        }}
                      />
                    ))}
                  </div>
                  </>
                )
              }
              
              {/* solid */}
              {
                subActiveTabs === 'Solid' && (
                  <div className="flex w-full flex-wrap max-h-[20vh] md:max-h-[40vh] overflow-y-scroll scroll-m-0 justify-center bg-white dark:bg-[#0f0f0f] dark:border-gray-700 border-gray-300 rounded-xl mt-2 p-1">
                      {
                        PlainColors.map((plainColor, index) => (
                          <span className={cn("block h-8 w-8 m-1 rounded-md border border-gray-400 cursor-pointer", selectedSolidColor === plainColor && 'border-1 rounded-full')} style={{background: plainColor}} key={plainColor}
                            onClick={() => setSelectedSolidColor(plainColor)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedGradient(plainColor);
                              }
                            }}

                          />
                        )
                      )
                      }
                    </div>
                )
              }
            </>
          )
        }  
      

        <label className="inline-flex items-center m-2 my-8 cursor-pointer">
          <input id="showWatermark" type="checkbox" className="sr-only peer" value="" checked={showWatermark} onChange={() => setShowWatermark(!showWatermark)}/>
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"/>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-100">Show Watermark</span>
        </label> 
        <a className="flex flex-col border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-3 rounded-sm transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 mx-2" href="/pricing">
          <button className="flex items-center text-sm" type="button">
            <img src="/crown.webp" alt="upgrade" className="w-4 h-4 mr-2.5 rounded-sm"/>
            <span>Upgrade</span>
          </button>
        </a>
        <p className="text-xs mt-2">Get 50% off on <span className="font-semibold">Lifetime</span> deal, use code <span className ="font-semibold font-mono">NEW50</span>
        </p>
    </div>
  );
};
export default TwitterMockup;