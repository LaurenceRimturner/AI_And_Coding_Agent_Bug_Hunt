import type { Book } from "../../types";
import BookCard from "../BookCard";

type BookListProps = {
  books: Book[];
  onToggleRead: (id: string) => void;
  onRemove: (index: number) => void;
};

export default function BookList({
  books,
  onToggleRead,
  onRemove,
}: BookListProps) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book, index) => (
        <BookCard
          key={book.id}
          book={book}
          onToggleRead={() => onToggleRead(book.id)}
          onRemove={() => onRemove(index)}
        />
      ))}
    </ul>
  );
}
