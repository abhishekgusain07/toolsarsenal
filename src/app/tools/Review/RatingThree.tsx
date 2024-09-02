'use client'
import { Stars } from "@/components/ui/stars"
import Image from "next/image"
import { useRef, useState } from "react"

// 👇 available here: https://crotus.io/dashboard/primitive-components

interface CenteredWithImageProps {
  displayName: string
  text: string
  rating: number
  jobTitle: string
}

export const CenteredWithImage = ({
  displayName,
  text,
  rating,
  jobTitle,
}: CenteredWithImageProps) => {
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
  const basicImageSrc = 'https://www.picyard.in/Elon.jpg'

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
        <h2 id="review-heading" className="sr-only" contentEditable={true}>
          Customer Review
        </h2>
        <div className="flex">
          <Stars className="size-5" rating={rating} />
        </div>

        <blockquote className="flex flex-col items-center gap-6">
          <p className="max-w-lg text-balance text-center text-lg text-gray-700" contentEditable={true}>{text}</p>
          <footer className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
              <Image fill alt={`Profile picture of ${displayName}`} src={userImage || basicImageSrc} onClick={handleImageClick} onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleImageClick();
                }
              }} />
            </div>

            <div className="flex flex-col">
              <cite className="block font-medium not-italic text-gray-900" contentEditable={true}>{displayName}</cite>
              <p className="text-gray-600" contentEditable={true}>{jobTitle}</p>
            </div>
          </footer>
        </blockquote>
      </div>
    </article>
  )
}
