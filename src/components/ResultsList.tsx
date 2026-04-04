import type { BookCandidate } from '../types/book'
import { BookCard } from './BookCard'

export interface ResultsListProps {
  candidates: BookCandidate[]
}

export function ResultsList({ candidates }: ResultsListProps) {
  return (
    <ul className="flex list-none flex-col gap-8 p-0">
      {candidates.map((book, i) => (
        <li key={`${book.workKey}-${i}`}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  )
}
