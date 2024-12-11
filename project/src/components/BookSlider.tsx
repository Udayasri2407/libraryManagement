import React from 'react';

const books = [
  {
    id: 1,
    title: "The Art of Programming",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80",
    author: "John Smith"
  },
  {
    id: 2,
    title: "Data Structures Explained",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&q=80",
    author: "Jane Doe"
  },
  {
    id: 3,
    title: "Web Development Mastery",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
    author: "David Wilson"
  }
];

export function BookSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSlider;