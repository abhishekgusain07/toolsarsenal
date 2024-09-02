'use client'
import Image from "next/image"
import { useRef, useState } from "react"

//Todo: Add star rating option here


interface HighlightedAuthorReviewProps {
  displayName: string
  text: string
  jobTitle: string
}

export const HighlightedAuthorReview = ({
  displayName,
  text,
  jobTitle,
}: HighlightedAuthorReviewProps) => {
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
      <div className="mx-auto max-w-3xl">
        <h2 id="review-heading" className="sr-only" contentEditable={true}>
          Customer Review
        </h2>
        <blockquote className="text-center">
          <p className="mb-6 text-lg text-gray-600" contentEditable={true}>{text}</p>
          <footer className="flex flex-col items-center sm:flex-row sm:justify-center">
            <div className="relative mr-2.5 size-12 shrink-0 overflow-hidden rounded-full">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <Image fill alt={`Profile picture of ${displayName}`} src={userImage || basicImageSrc} onClick={handleImageClick}/>
            </div>
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-2.5">
              <cite className="block font-medium not-italic text-gray-900" contentEditable={true}>{displayName}</cite>
              <p className="text-gray-600" contentEditable={true}>{jobTitle}</p>
            </div>
          </footer>
        </blockquote>
      </div>
    </article>
  )
}
