import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft, X, Download } from 'lucide-react';

const categoryBooks = {
  'computer-science': [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80",
      description: "Comprehensive introduction to computer algorithms",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/intro-to-algorithms.pdf",
      url: "/books/intro-to-algorithms.pdf",
      pages: 1312,
      publisher: "MIT Press",
      year: 2009,
      isbn: "978-0262033848"
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=300&q=80",
      description: "A handbook of agile software craftsmanship",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/clean-code.pdf",
      url: "/books/clean-code.pdf",
      pages: 464,
      publisher: "Prentice Hall",
      year: 2008,
      isbn: "978-0132350884"
    },
    {
      id: 3,
      title: "Design Patterns",
      author: "Erich Gamma",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80",
      description: "Elements of Reusable Object-Oriented Software",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/design-patterns.pdf",
      url: "/books/design-patterns.pdf",
      pages: 416,
      publisher: "Addison-Wesley",
      year: 1994,
      isbn: "978-0201633610"
    }
  ],
  // ... other categories remain the same
};

export default function Categories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const books = categoryBooks[category as keyof typeof categoryBooks] || [];
  
  const getCategoryTitle = (slug: string) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleDownload = (url: string) => {
    // In a real application, this would trigger the actual download
    console.log('Downloading:', url);
  };

  const BookDetailsModal = ({ book, onClose }: { book: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-2xl font-semibold">{book.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="mt-4 space-y-2">
                <p><span className="font-semibold">Author:</span> {book.author}</p>
                <p><span className="font-semibold">Publisher:</span> {book.publisher}</p>
                <p><span className="font-semibold">Year:</span> {book.year}</p>
                <p><span className="font-semibold">Pages:</span> {book.pages}</p>
                <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
              </div>
              <button
                onClick={() => handleDownload(book.url)}
                className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Book
              </button>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Preview</h4>
              <iframe
                src={book.preview}
                className="w-full h-[500px] border rounded"
                title={`Preview of ${book.title}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-8">{getCategoryTitle(category || '')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setSelectedBook(book)}
              />
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <Book className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-indigo-600"
                        onClick={() => setSelectedBook(book)}>
                      {book.title}
                    </h2>
                    <p className="text-gray-600">by {book.author}</p>
                  </div>
                </div>
                <p className="text-gray-700">{book.description}</p>
                <button 
                  onClick={() => setSelectedBook(book)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}