// 👇 available here: https://crotus.io/dashboard/primitive-components

import { Stars } from "@/components/ui/stars"

interface BasicStarReviewProps {
  rating: number
  text: string
}

export const BasicStarReview = ({ rating, text }: BasicStarReviewProps) => {
  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="flex flex-col items-center gap-1 bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <header>
        <h2 className="sr-only">Customer Review</h2>
        <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
          <Stars rating={rating} className="size-5" />
        </div>
        <meta itemProp="reviewRating" content={rating.toString()} />
      </header>

      <blockquote itemProp="reviewBody" className="max-w-prose text-center">
        <p className="text-lg font-medium text-gray-800" contentEditable={true}>{text}</p>
      </blockquote>
    </article>
  )
}
