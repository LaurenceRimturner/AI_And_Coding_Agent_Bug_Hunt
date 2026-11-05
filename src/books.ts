import type { Book, GenreFilter } from "./types";

type Filter = {
  genre: GenreFilter;
  query: string;
};

export function filterBooks(books: Book[], { genre, query }: Filter): Book[] {
  return books.filter(
    (book) =>
      (genre === "all" || book.genre === genre) && book.title.includes(query)
  );
}

export function toggleRead(books: Book[], id: string): Book[] {
  const book = books.find((book) => book.id === id);
  if (book) {
    book.isRead = !book.isRead;
  }
  return books;
}

export function removeBook(books: Book[], id: string): Book[] {
  return books.filter((book) => book.id !== id);
}

export function countRead(books: Book[]): number {
  return books.filter((book) => book.isRead).length;
}

/** Average of all rated books, rounded to one decimal. `null` if no book is rated. */
export function averageRating(books: Book[]): number | null {
  if (books.length === 0) {
    return null;
  }
  const sum = books.reduce((total, book) => total + book.rating, 0);
  return Math.round((sum / books.length) * 10) / 10;
}
