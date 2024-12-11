import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookCard } from '../components/BookCard';
import { SearchBar } from '../components/SearchBar';
import { getBooks } from '../utils/api';
import { Book } from '../types';

export const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: books = [], isLoading, isError } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading books. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Library Collection</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={(bookId) => {
              console.log('Borrowing book:', bookId);
              // Implement borrow functionality
            }}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
};